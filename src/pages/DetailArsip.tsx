import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Eye, Edit, Trash2, Download, FileText, Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DetailArsip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDokter, setFilterDokter] = useState("all");

  // Mock arsip data
  const [arsipData] = useState({
    idArsip: id || "A-2024-001",
    kodeArsip: "K-2024-001",
    tanggalArsip: "2024-01-15",
  });

  // Mock patient records within this archive
  const [patientRecords, setPatientRecords] = useState([
    {
      id: "P001",
      namaPasien: "Maria Santos",
      jenisKelamin: "Perempuan",
      diagnosa: "Depresi Ringan",
      kodeArsip: "K-2024-001",
      tanggalPeriksa: "2024-01-15",
      dokter: "Dr. Tanti",
      file: "assessment_maria.pdf",
    },
    {
      id: "P002",
      namaPasien: "Ahmad Budi",
      jenisKelamin: "Laki-laki",
      diagnosa: "Kecemasan",
      kodeArsip: "K-2024-001",
      tanggalPeriksa: "2024-01-15",
      dokter: "Dr. Lina",
      file: "assessment_ahmad.pdf",
    },
  ]);

  const [formData, setFormData] = useState({
    namaPasien: "",
    jenisKelamin: "",
    diagnosa: "",
    kodeArsip: arsipData.kodeArsip,
    tanggalPeriksa: "",
    dokter: "",
    file: null as File | null,
  });

  const filteredRecords = patientRecords.filter((record) => {
    const matchesSearch = 
      record.namaPasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosa.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDokter = filterDokter === "all" || record.dokter === filterDokter;
    
    return matchesSearch && matchesDokter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      id: `P${String(patientRecords.length + 1).padStart(3, "0")}`,
      namaPasien: formData.namaPasien,
      jenisKelamin: formData.jenisKelamin,
      diagnosa: formData.diagnosa,
      kodeArsip: formData.kodeArsip,
      tanggalPeriksa: formData.tanggalPeriksa,
      dokter: formData.dokter,
      file: formData.file?.name || "",
    };
    setPatientRecords([...patientRecords, newRecord]);
    setShowForm(false);
    setFormData({
      namaPasien: "",
      jenisKelamin: "",
      diagnosa: "",
      kodeArsip: arsipData.kodeArsip,
      tanggalPeriksa: "",
      dokter: "",
      file: null,
    });
    toast({
      title: "Berhasil",
      description: "Data pasien berhasil ditambahkan",
    });
  };

  const handleDelete = (recordId: string) => {
    setPatientRecords(patientRecords.filter((record) => record.id !== recordId));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/arsip")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Detail Arsip</h1>
          <p className="text-muted-foreground mt-1">
            Informasi lengkap arsip pasien dan data terkait
          </p>
        </div>
      </div>

      {/* Archive Info Card */}
      <Card className="shadow-card border-0">
        <CardHeader className="bg-gradient-soft">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl mb-2">Informasi Arsip</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="font-mono">
                  {arsipData.idArsip}
                </Badge>
                <Badge variant="secondary">
                  {arsipData.kodeArsip}
                </Badge>
              </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-secondary hover:bg-secondary-dark text-secondary-foreground hover:shadow-hover transition-all duration-300 gap-2">
                  <Plus className="w-4 h-4" />
                  Tambah Data Pasien
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Tambah Data Arsip Pasien Baru</DialogTitle>
                  <DialogDescription>
                    Isi formulir di bawah untuk menambahkan data pasien ke dalam arsip ini
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="namaPasien">Nama Pasien *</Label>
                      <Input
                        id="namaPasien"
                        placeholder="Masukkan nama lengkap"
                        value={formData.namaPasien}
                        onChange={(e) =>
                          setFormData({ ...formData, namaPasien: e.target.value })
                        }
                        required
                        className="bg-muted/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kodeArsip">Kode Arsip *</Label>
                      <Input
                        id="kodeArsip"
                        value={formData.kodeArsip}
                        readOnly
                        className="bg-muted/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tanggalArsip">Tanggal Arsip *</Label>
                      <Input
                        id="tanggalArsip"
                        type="date"
                        value={formData.tanggalArsip}
                        onChange={(e) =>
                          setFormData({ ...formData, tanggalArsip: e.target.value })
                        }
                        required
                        className="bg-muted/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dokter">Dokter *</Label>
                      <Select
                        value={formData.dokter}
                        onValueChange={(value) =>
                          setFormData({ ...formData, dokter: value })
                        }
                      >
                        <SelectTrigger className="bg-muted/50 border-border">
                          <SelectValue placeholder="Pilih dokter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dr. Tanti">Dr. Tanti</SelectItem>
                          <SelectItem value="Dr. Lina">Dr. Lina</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File (PDF) *</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setFormData({ ...formData, file: e.target.files?.[0] || null })
                      }
                      required
                      className="bg-muted/50 border-border cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary-dark"
                    />
                    <p className="text-xs text-muted-foreground">
                      Hanya file PDF yang diperbolehkan
                    </p>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-secondary hover:bg-secondary-dark text-secondary-foreground hover:shadow-hover transition-all duration-300"
                    >
                      Simpan Data
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">ID Arsip</p>
              <p className="font-medium text-foreground">{arsipData.idArsip}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Kode Arsip</p>
              <p className="font-medium text-foreground">{arsipData.kodeArsip}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tanggal Arsip</p>
              <p className="font-medium text-foreground">
                {new Date(arsipData.tanggalArsip).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Records Table */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Data Pasien dalam Arsip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Nama Pasien</TableHead>
                  <TableHead className="font-semibold">Kode Arsip</TableHead>
                  <TableHead className="font-semibold">Tanggal Arsip</TableHead>
                  <TableHead className="font-semibold">Dokter</TableHead>
                  <TableHead className="font-semibold">File</TableHead>
                  <TableHead className="font-semibold text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Belum ada data pasien dalam arsip ini
                    </TableCell>
                  </TableRow>
                ) : (
                  patientRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{record.namaPasien}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {record.kodeArsip}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(record.tanggalPeriksa).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell>{record.dokter}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{record.file}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-secondary hover:text-secondary hover:bg-secondary/10"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(record.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailArsip;
