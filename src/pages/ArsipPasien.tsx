import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArsipPasien = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [arsipData, setArsipData] = useState([
    {
      idArsip: "A-2024-001",
      kodeArsip: "K-2024-001",
      tanggalArsip: "2024-01-15",
    },
    {
      idArsip: "A-2024-002",
      kodeArsip: "TP-2024-002",
      tanggalArsip: "2024-01-14",
    },
    {
      idArsip: "A-2024-003",
      kodeArsip: "K-2024-003",
      tanggalArsip: "2024-01-13",
    },
  ]);

  const [formData, setFormData] = useState({
    kodeArsip: "",
    tanggalArsip: "",
  });

  const filteredData = arsipData.filter((item) => {
    const matchesSearch =
      item.idArsip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kodeArsip.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArsip = {
      idArsip: `A-2024-${String(arsipData.length + 1).padStart(3, "0")}`,
      kodeArsip: formData.kodeArsip,
      tanggalArsip: formData.tanggalArsip,
    };
    setArsipData([...arsipData, newArsip]);
    setDialogOpen(false);
    setFormData({
      kodeArsip: "",
      tanggalArsip: "",
    });
    toast({
      title: "Berhasil",
      description: "Arsip pasien berhasil ditambahkan",
    });
  };

  const handleDelete = (idArsip: string) => {
    setArsipData(arsipData.filter((item) => item.idArsip !== idArsip));
    toast({
      title: "Berhasil",
      description: "Arsip pasien berhasil dihapus",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Arsip Pasien</h1>
          <p className="text-muted-foreground mt-1">
            Kelola data arsip pasien klinik psikologi
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary-dark text-secondary-foreground hover:shadow-hover transition-all duration-300 gap-2">
              <Plus className="w-4 h-4" />
              Tambah Arsip Pasien
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Tambah Arsip Pasien Baru</DialogTitle>
              <DialogDescription>
                Isi formulir di bawah untuk menambahkan arsip pasien baru
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="kodeArsip">Kode Arsip *</Label>
                  <Input
                    id="kodeArsip"
                    placeholder="Contoh: K-2024-001"
                    value={formData.kodeArsip}
                    onChange={(e) =>
                      setFormData({ ...formData, kodeArsip: e.target.value })
                    }
                    required
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
                  Simpan Arsip
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="shadow-card border-0 mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari berdasarkan ID Arsip atau Kode Arsip..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50 border-border focus:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Daftar Arsip Pasien
          </CardTitle>
          <CardDescription>
            Total {filteredData.length} arsip ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">ID Arsip</TableHead>
                  <TableHead className="font-semibold">Kode Arsip</TableHead>
                  <TableHead className="font-semibold">Tanggal Arsip</TableHead>
                  <TableHead className="font-semibold text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.idArsip} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{item.idArsip}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {item.kodeArsip}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(item.tanggalArsip).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => navigate(`/arsip/${item.idArsip}`)}
                        >
                          <Eye className="h-4 w-4" />
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
                          onClick={() => handleDelete(item.idArsip)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArsipPasien;
