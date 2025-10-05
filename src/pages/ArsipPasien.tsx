import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  FileText,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArsipPasien = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [arsipData, setArsipData] = useState([
    {
      id: "NRM001",
      nama: "Maria Santos",
      usia: 28,
      jenisKelamin: "Perempuan",
      diagnosis: "Gangguan Kecemasan",
      tanggal: "2024-01-15",
      dokter: "Dr. Sarah Ahmad",
      kodeArsip: "K-2024-001"
    },
    {
      id: "NRM002",
      nama: "Ahmad Rahman",
      usia: 35,
      jenisKelamin: "Laki-laki",
      diagnosis: "Depresi Ringan",
      tanggal: "2024-01-14",
      dokter: "Dr. John Doe",
      kodeArsip: "TP-2024-002"
    },
    {
      id: "NRM003",
      nama: "Siti Nurhaliza",
      usia: 23,
      jenisKelamin: "Perempuan",
      diagnosis: "Stress Akademik",
      tanggal: "2024-01-13",
      dokter: "Dr. Lisa Wong",
      kodeArsip: "K-2024-003"
    }
  ]);

  const [formData, setFormData] = useState({
    nama: "",
    tanggal: "",
    dokter: "",
    kodeArsip: "",
    file: null as File | null
  });

  const filteredData = arsipData.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.kodeArsip.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `NRM${String(arsipData.length + 1).padStart(3, '0')}`;
    const newArsip = {
      id: newId,
      nama: formData.nama,
      usia: 0,
      jenisKelamin: "",
      diagnosis: "",
      tanggal: formData.tanggal,
      dokter: formData.dokter,
      kodeArsip: formData.kodeArsip
    };
    
    setArsipData([...arsipData, newArsip]);
    setFormData({
      nama: "",
      tanggal: "",
      dokter: "",
      kodeArsip: "",
      file: null
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Berhasil",
      description: "Arsip pasien berhasil ditambahkan",
    });
  };

  const handleDelete = (id: string) => {
    setArsipData(arsipData.filter(item => item.id !== id));
    toast({
      title: "Berhasil",
      description: "Arsip pasien berhasil dihapus",
      variant: "destructive"
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Arsip Pasien</h1>
          <p className="text-muted-foreground">Kelola data arsip pasien klinik psikologi</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Arsip Pasien
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Arsip Pasien Baru</DialogTitle>
              <DialogDescription>
                Isi formulir di bawah untuk menambahkan arsip pasien baru
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Pasien *</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  required
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kodeArsip">Kode Arsip *</Label>
                <Input
                  id="kodeArsip"
                  value={formData.kodeArsip}
                  onChange={(e) => setFormData({...formData, kodeArsip: e.target.value})}
                  required
                  placeholder="Contoh: K-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal Registrasi *</Label>
                <Input
                  id="tanggal"
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dokter">Dokter Penanggung Jawab *</Label>
                <Select onValueChange={(value) => setFormData({...formData, dokter: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih dokter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. John Doe">Dr. John Doe</SelectItem>
                    <SelectItem value="Dr. Sarah Ahmad">Dr. Sarah Ahmad</SelectItem>
                    <SelectItem value="Dr. Lisa Wong">Dr. Lisa Wong</SelectItem>
                    <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Upload File (PDF)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                  <Upload className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-primary">
                  Simpan Arsip
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Pencarian & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari berdasarkan ID NRM, nama pasien, atau kode arsip..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Konseling">Konseling</SelectItem>
                <SelectItem value="Tes Psikologi">Tes Psikologi</SelectItem>
                <SelectItem value="Laporan Medis">Laporan Medis</SelectItem>
                <SelectItem value="Terapi">Terapi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary" />
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
                  <TableHead>ID NRM</TableHead>
                  <TableHead>Nama Pasien</TableHead>
                  <TableHead>Kode Arsip</TableHead>
                  <TableHead>Tanggal Registrasi</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {item.nama}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {item.kodeArsip}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(item.tanggal).toLocaleDateString('id-ID')}
                      </div>
                    </TableCell>
                    <TableCell>{item.dokter}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
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