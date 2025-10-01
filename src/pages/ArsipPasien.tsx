import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  FileText,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArsipPasien = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [arsipData, setArsipData] = useState([
    {
      id: "ARS001",
      nama: "Maria Santos",
      usia: 8,
      jenisKelamin: "Perempuan",
      diagnosis: "ADHD",
      tanggalRegistrasi: "2024-01-15",
      dokter: "Dr. Sarah Ahmad",
      status: "Aktif"
    },
    {
      id: "ARS002",
      nama: "Ahmad Rahman",
      usia: 10,
      jenisKelamin: "Laki-laki",
      diagnosis: "Anxiety Disorder",
      tanggalRegistrasi: "2024-01-14",
      dokter: "Dr. John Doe",
      status: "Selesai"
    },
  ]);

  // Form Registrasi Pasien
  const [registrasiForm, setRegistrasiForm] = useState({
    tanggalRegistrasi: "",
    namaLengkap: "",
    namaPanggilan: "",
    tempatLahir: "",
    tanggalLahir: "",
    usia: "",
    jenisKelamin: "",
    agama: "",
    pendidikan: "",
    namaBapak: "",
    namaIbu: "",
    noTelepon: "",
    noHP: "",
    alamat: "",
    rt: "",
    rw: "",
    kodePos: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    // Riwayat Anak
    gangguanMengandung: "",
    melahirkanNormal: false,
    melahirkanCaesar: false,
    melahirkanVacum: false,
    beratLahir: "",
    panjangLahir: "",
    merangkakUsia: "",
    berjalanUsia: "",
    berbicaraUsia: "",
    menangisLahir: "",
    menyusuiASI: "",
    lamaASI: "",
    // Riwayat Kesehatan
    riwayatKesehatan: "",
    // Riwayat Perkembangan
    perkembanganMotorik: "",
    perkembanganBahasa: "",
    perkembanganEmosi: "",
    perkembanganSosial: "",
    masalahPerilaku: "",
    // Kemampuan Akademik
    keluhanGuru: "",
    sikapSekolah: "",
    sistemBelajar: "",
    bantuanKhusus: "",
    // Hubungan Keluarga
    hubunganOrangTua: "",
    sikapDirumah: "",
    keluhanDirumah: "",
  });

  // Form Rekam Psikologi
  const [rekamPsikologiForm, setRekamPsikologiForm] = useState({
    nrm: "",
    nama: "",
    tanggalLahir: "",
    pendidikan: "",
    alamat: "",
    jenisKelamin: "",
    urutanKelahiran: "",
    agama: "",
    status: "",
    pekerjaan: "",
    tanggalPemeriksaan: "",
    // Riwayat Penyakit
    diagnosaDokter: "",
    keluhanFisik: "",
    keluhanPsikologis: "",
    // Observasi
    penampilanUmum: "",
    sikapPemeriksa: "",
    afek: "",
    romanMuka: "",
    prosesPikir: "",
    gangguanPersepsi: "",
    // Fungsi Psikologi
    kognitif: "",
    memori: "",
    konsentrasi: "",
    orientasi: "",
    kemampuanVerbal: "",
    emosi: "",
    perilaku: "",
    // Checklist Gejala
    sakitKepala: false,
    kurangNafsuMakan: false,
    sulitTidur: false,
    mudahTakut: false,
    tegang: false,
    cemas: false,
    gemetar: false,
    gangguanPerut: false,
    sulitKonsentrasi: false,
    sedih: false,
    sulitAmbilKeputusan: false,
    kehilanganMinat: false,
    merasaTidakBerguna: false,
    mudahLupa: false,
    merasaBersalah: false,
    mudahLelah: false,
    putusAsa: false,
    mudahMarah: false,
    mudahTersinggung: false,
    mimpiBuruk: false,
    tidakPercayaDiri: false,
    // Asesmen Lanjutan
    psikotensPendukung: "",
    dinamikaPsikologi: "",
    diagnosaPsikologi: "",
    rencanaIntervensi: "",
    intervensiPsikologi: "",
  });

  const [tindakanOrangTua, setTindakanOrangTua] = useState([
    { penanganan: "", namaDokter: "", kapan: "", hasil: "" }
  ]);

  const [riwayatTerapi, setRiwayatTerapi] = useState([
    { jenisTerapi: "", berapa: "", dimana: "" }
  ]);

  const filteredData = arsipData.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `ARS${String(arsipData.length + 1).padStart(3, '0')}`;
    const newArsip = {
      id: newId,
      nama: registrasiForm.namaLengkap,
      usia: parseInt(registrasiForm.usia),
      jenisKelamin: registrasiForm.jenisKelamin,
      diagnosis: rekamPsikologiForm.diagnosaPsikologi,
      tanggalRegistrasi: registrasiForm.tanggalRegistrasi,
      dokter: "Dr. John Doe",
      status: "Aktif"
    };
    
    setArsipData([...arsipData, newArsip]);
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
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Arsip Pasien Baru</DialogTitle>
              <DialogDescription>
                Isi formulir registrasi pasien dan rekam psikologi
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="registrasi" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="registrasi">Registrasi Pasien</TabsTrigger>
                  <TabsTrigger value="rekam">Rekam Psikologi</TabsTrigger>
                </TabsList>

                {/* TAB 1: REGISTRASI PASIEN */}
                <TabsContent value="registrasi" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Data Registrasi</h3>
                    <div className="space-y-2">
                      <Label htmlFor="tanggalRegistrasi">Tanggal Registrasi *</Label>
                      <Input
                        id="tanggalRegistrasi"
                        type="date"
                        value={registrasiForm.tanggalRegistrasi}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, tanggalRegistrasi: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Data Anak</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                        <Input
                          id="namaLengkap"
                          value={registrasiForm.namaLengkap}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, namaLengkap: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="namaPanggilan">Nama Panggilan</Label>
                        <Input
                          id="namaPanggilan"
                          value={registrasiForm.namaPanggilan}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, namaPanggilan: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tempatLahir">Tempat Lahir *</Label>
                        <Input
                          id="tempatLahir"
                          value={registrasiForm.tempatLahir}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, tempatLahir: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggalLahir">Tanggal Lahir *</Label>
                        <Input
                          id="tanggalLahir"
                          type="date"
                          value={registrasiForm.tanggalLahir}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, tanggalLahir: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="usia">Usia *</Label>
                        <Input
                          id="usia"
                          type="number"
                          value={registrasiForm.usia}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, usia: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                        <Select onValueChange={(value) => setRegistrasiForm({...registrasiForm, jenisKelamin: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agama">Agama</Label>
                        <Input
                          id="agama"
                          value={registrasiForm.agama}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, agama: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pendidikan">Pendidikan Saat Ini</Label>
                        <Input
                          id="pendidikan"
                          value={registrasiForm.pendidikan}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, pendidikan: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="namaBapak">Nama Bapak</Label>
                        <Input
                          id="namaBapak"
                          value={registrasiForm.namaBapak}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, namaBapak: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="namaIbu">Nama Ibu</Label>
                        <Input
                          id="namaIbu"
                          value={registrasiForm.namaIbu}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, namaIbu: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noTelepon">No Telepon</Label>
                        <Input
                          id="noTelepon"
                          value={registrasiForm.noTelepon}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, noTelepon: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noHP">No HP</Label>
                        <Input
                          id="noHP"
                          value={registrasiForm.noHP}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, noHP: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat</Label>
                      <Textarea
                        id="alamat"
                        value={registrasiForm.alamat}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, alamat: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rt">RT</Label>
                        <Input
                          id="rt"
                          value={registrasiForm.rt}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, rt: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rw">RW</Label>
                        <Input
                          id="rw"
                          value={registrasiForm.rw}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, rw: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kodePos">Kode Pos</Label>
                        <Input
                          id="kodePos"
                          value={registrasiForm.kodePos}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, kodePos: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kelurahan">Kelurahan</Label>
                        <Input
                          id="kelurahan"
                          value={registrasiForm.kelurahan}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, kelurahan: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="kecamatan">Kecamatan</Label>
                        <Input
                          id="kecamatan"
                          value={registrasiForm.kecamatan}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, kecamatan: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kota">Kota</Label>
                        <Input
                          id="kota"
                          value={registrasiForm.kota}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, kota: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Riwayat Anak</h3>
                    <div className="space-y-2">
                      <Label htmlFor="gangguanMengandung">Gangguan Selama Mengandung</Label>
                      <Textarea
                        id="gangguanMengandung"
                        value={registrasiForm.gangguanMengandung}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, gangguanMengandung: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Melahirkan Secara</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="melahirkanNormal"
                            checked={registrasiForm.melahirkanNormal}
                            onCheckedChange={(checked) => setRegistrasiForm({...registrasiForm, melahirkanNormal: checked as boolean})}
                          />
                          <Label htmlFor="melahirkanNormal">Normal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="melahirkanCaesar"
                            checked={registrasiForm.melahirkanCaesar}
                            onCheckedChange={(checked) => setRegistrasiForm({...registrasiForm, melahirkanCaesar: checked as boolean})}
                          />
                          <Label htmlFor="melahirkanCaesar">Caesar</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="melahirkanVacum"
                            checked={registrasiForm.melahirkanVacum}
                            onCheckedChange={(checked) => setRegistrasiForm({...registrasiForm, melahirkanVacum: checked as boolean})}
                          />
                          <Label htmlFor="melahirkanVacum">Vacum</Label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="beratLahir">Berat Lahir (kg)</Label>
                        <Input
                          id="beratLahir"
                          value={registrasiForm.beratLahir}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, beratLahir: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="panjangLahir">Panjang Lahir (cm)</Label>
                        <Input
                          id="panjangLahir"
                          value={registrasiForm.panjangLahir}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, panjangLahir: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="merangkakUsia">Merangkak di Usia (bulan)</Label>
                        <Input
                          id="merangkakUsia"
                          value={registrasiForm.merangkakUsia}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, merangkakUsia: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="berjalanUsia">Berjalan di Usia (bulan)</Label>
                        <Input
                          id="berjalanUsia"
                          value={registrasiForm.berjalanUsia}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, berjalanUsia: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="berbicaraUsia">Mulai Berbicara di Usia (bulan)</Label>
                        <Input
                          id="berbicaraUsia"
                          value={registrasiForm.berbicaraUsia}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, berbicaraUsia: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="menangisLahir">Menangis Saat Lahir?</Label>
                        <Select onValueChange={(value) => setRegistrasiForm({...registrasiForm, menangisLahir: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ya">Ya</SelectItem>
                            <SelectItem value="Tidak">Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="menyusuiASI">Menyusui ASI?</Label>
                        <Select onValueChange={(value) => setRegistrasiForm({...registrasiForm, menyusuiASI: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ya">Ya</SelectItem>
                            <SelectItem value="Tidak">Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lamaASI">Lama Menyusui (bulan)</Label>
                        <Input
                          id="lamaASI"
                          value={registrasiForm.lamaASI}
                          onChange={(e) => setRegistrasiForm({...registrasiForm, lamaASI: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Riwayat Kesehatan</h3>
                    <div className="space-y-2">
                      <Label htmlFor="riwayatKesehatan">Riwayat Kesehatan (penyakit, alergi, dll)</Label>
                      <Textarea
                        id="riwayatKesehatan"
                        value={registrasiForm.riwayatKesehatan}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, riwayatKesehatan: e.target.value})}
                        rows={3}
                        placeholder="Jelaskan riwayat kesehatan anak"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Riwayat Perkembangan</h3>
                    <div className="space-y-2">
                      <Label htmlFor="perkembanganMotorik">Perkembangan Motorik</Label>
                      <Textarea
                        id="perkembanganMotorik"
                        value={registrasiForm.perkembanganMotorik}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, perkembanganMotorik: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perkembanganBahasa">Perkembangan Bahasa</Label>
                      <Textarea
                        id="perkembanganBahasa"
                        value={registrasiForm.perkembanganBahasa}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, perkembanganBahasa: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perkembanganEmosi">Perkembangan Emosi</Label>
                      <Textarea
                        id="perkembanganEmosi"
                        value={registrasiForm.perkembanganEmosi}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, perkembanganEmosi: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perkembanganSosial">Perkembangan Sosial</Label>
                      <Textarea
                        id="perkembanganSosial"
                        value={registrasiForm.perkembanganSosial}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, perkembanganSosial: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="masalahPerilaku">Masalah Perilaku</Label>
                      <Textarea
                        id="masalahPerilaku"
                        value={registrasiForm.masalahPerilaku}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, masalahPerilaku: e.target.value})}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Kemampuan Akademik</h3>
                    <div className="space-y-2">
                      <Label htmlFor="keluhanGuru">Keluhan Guru</Label>
                      <Textarea
                        id="keluhanGuru"
                        value={registrasiForm.keluhanGuru}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, keluhanGuru: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sikapSekolah">Sikap di Sekolah</Label>
                      <Textarea
                        id="sikapSekolah"
                        value={registrasiForm.sikapSekolah}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, sikapSekolah: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sistemBelajar">Sistem Belajar</Label>
                      <Textarea
                        id="sistemBelajar"
                        value={registrasiForm.sistemBelajar}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, sistemBelajar: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bantuanKhusus">Bantuan Khusus yang Diberikan</Label>
                      <Textarea
                        id="bantuanKhusus"
                        value={registrasiForm.bantuanKhusus}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, bantuanKhusus: e.target.value})}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Hubungan dengan Keluarga</h3>
                    <div className="space-y-2">
                      <Label htmlFor="hubunganOrangTua">Hubungan dengan Orang Tua</Label>
                      <Textarea
                        id="hubunganOrangTua"
                        value={registrasiForm.hubunganOrangTua}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, hubunganOrangTua: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sikapDirumah">Sikap di Rumah</Label>
                      <Textarea
                        id="sikapDirumah"
                        value={registrasiForm.sikapDirumah}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, sikapDirumah: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keluhanDirumah">Keluhan Anak di Rumah</Label>
                      <Textarea
                        id="keluhanDirumah"
                        value={registrasiForm.keluhanDirumah}
                        onChange={(e) => setRegistrasiForm({...registrasiForm, keluhanDirumah: e.target.value})}
                        rows={2}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* TAB 2: REKAM PSIKOLOGI */}
                <TabsContent value="rekam" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Identitas Pasien</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nrm">NRM</Label>
                        <Input
                          id="nrm"
                          value={rekamPsikologiForm.nrm}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, nrm: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="namaRekam">Nama</Label>
                        <Input
                          id="namaRekam"
                          value={rekamPsikologiForm.nama}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, nama: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggalLahirRekam">Tanggal Lahir</Label>
                        <Input
                          id="tanggalLahirRekam"
                          type="date"
                          value={rekamPsikologiForm.tanggalLahir}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, tanggalLahir: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pendidikanRekam">Pendidikan</Label>
                        <Input
                          id="pendidikanRekam"
                          value={rekamPsikologiForm.pendidikan}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, pendidikan: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jenisKelaminRekam">Jenis Kelamin</Label>
                        <Select onValueChange={(value) => setRekamPsikologiForm({...rekamPsikologiForm, jenisKelamin: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="urutanKelahiran">Urutan Kelahiran</Label>
                        <Input
                          id="urutanKelahiran"
                          value={rekamPsikologiForm.urutanKelahiran}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, urutanKelahiran: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agamaRekam">Agama</Label>
                        <Input
                          id="agamaRekam"
                          value={rekamPsikologiForm.agama}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, agama: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="statusRekam">Status</Label>
                        <Input
                          id="statusRekam"
                          value={rekamPsikologiForm.status}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, status: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pekerjaan">Pekerjaan</Label>
                        <Input
                          id="pekerjaan"
                          value={rekamPsikologiForm.pekerjaan}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, pekerjaan: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggalPemeriksaan">Tanggal Pemeriksaan</Label>
                        <Input
                          id="tanggalPemeriksaan"
                          type="date"
                          value={rekamPsikologiForm.tanggalPemeriksaan}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, tanggalPemeriksaan: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alamatRekam">Alamat</Label>
                      <Textarea
                        id="alamatRekam"
                        value={rekamPsikologiForm.alamat}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, alamat: e.target.value})}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Riwayat Penyakit</h3>
                    <div className="space-y-2">
                      <Label htmlFor="diagnosaDokter">Diagnosa Dokter</Label>
                      <Textarea
                        id="diagnosaDokter"
                        value={rekamPsikologiForm.diagnosaDokter}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, diagnosaDokter: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keluhanFisik">Keluhan Fisik</Label>
                      <Textarea
                        id="keluhanFisik"
                        value={rekamPsikologiForm.keluhanFisik}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, keluhanFisik: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keluhanPsikologis">Keluhan Psikologis</Label>
                      <Textarea
                        id="keluhanPsikologis"
                        value={rekamPsikologiForm.keluhanPsikologis}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, keluhanPsikologis: e.target.value})}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Observasi</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="penampilanUmum">Penampilan Umum</Label>
                        <Input
                          id="penampilanUmum"
                          value={rekamPsikologiForm.penampilanUmum}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, penampilanUmum: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sikapPemeriksa">Sikap terhadap Pemeriksa</Label>
                        <Input
                          id="sikapPemeriksa"
                          value={rekamPsikologiForm.sikapPemeriksa}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, sikapPemeriksa: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="afek">Afek</Label>
                        <Input
                          id="afek"
                          value={rekamPsikologiForm.afek}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, afek: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="romanMuka">Roman Muka</Label>
                        <Input
                          id="romanMuka"
                          value={rekamPsikologiForm.romanMuka}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, romanMuka: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prosesPikir">Proses Pikir</Label>
                        <Input
                          id="prosesPikir"
                          value={rekamPsikologiForm.prosesPikir}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, prosesPikir: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gangguanPersepsi">Gangguan Persepsi</Label>
                        <Input
                          id="gangguanPersepsi"
                          value={rekamPsikologiForm.gangguanPersepsi}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, gangguanPersepsi: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Fungsi Psikologi</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="kognitif">Kognitif</Label>
                        <Input
                          id="kognitif"
                          value={rekamPsikologiForm.kognitif}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, kognitif: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="memori">Memori (+/-)</Label>
                        <Input
                          id="memori"
                          value={rekamPsikologiForm.memori}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, memori: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="konsentrasi">Konsentrasi (+/-)</Label>
                        <Input
                          id="konsentrasi"
                          value={rekamPsikologiForm.konsentrasi}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, konsentrasi: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="orientasi">Orientasi (+/-)</Label>
                        <Input
                          id="orientasi"
                          value={rekamPsikologiForm.orientasi}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, orientasi: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kemampuanVerbal">Kemampuan Verbal (+/-)</Label>
                        <Input
                          id="kemampuanVerbal"
                          value={rekamPsikologiForm.kemampuanVerbal}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, kemampuanVerbal: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emosi">Emosi</Label>
                        <Input
                          id="emosi"
                          value={rekamPsikologiForm.emosi}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, emosi: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="perilaku">Perilaku</Label>
                        <Input
                          id="perilaku"
                          value={rekamPsikologiForm.perilaku}
                          onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, perilaku: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Checklist Gejala</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: "sakitKepala", label: "Sakit kepala", key: "sakitKepala" },
                        { id: "kurangNafsuMakan", label: "Kurang nafsu makan", key: "kurangNafsuMakan" },
                        { id: "sulitTidur", label: "Sulit tidur", key: "sulitTidur" },
                        { id: "mudahTakut", label: "Mudah takut", key: "mudahTakut" },
                        { id: "tegang", label: "Tegang", key: "tegang" },
                        { id: "cemas", label: "Cemas", key: "cemas" },
                        { id: "gemetar", label: "Gemetar", key: "gemetar" },
                        { id: "gangguanPerut", label: "Gangguan perut", key: "gangguanPerut" },
                        { id: "sulitKonsentrasi", label: "Sulit konsentrasi", key: "sulitKonsentrasi" },
                        { id: "sedih", label: "Sedih", key: "sedih" },
                        { id: "sulitAmbilKeputusan", label: "Sulit ambil keputusan", key: "sulitAmbilKeputusan" },
                        { id: "kehilanganMinat", label: "Kehilangan minat", key: "kehilanganMinat" },
                        { id: "merasaTidakBerguna", label: "Merasa tidak berguna", key: "merasaTidakBerguna" },
                        { id: "mudahLupa", label: "Mudah lupa", key: "mudahLupa" },
                        { id: "merasaBersalah", label: "Merasa bersalah", key: "merasaBersalah" },
                        { id: "mudahLelah", label: "Mudah lelah", key: "mudahLelah" },
                        { id: "putusAsa", label: "Putus asa", key: "putusAsa" },
                        { id: "mudahMarah", label: "Mudah marah", key: "mudahMarah" },
                        { id: "mudahTersinggung", label: "Mudah tersinggung", key: "mudahTersinggung" },
                        { id: "mimpiBuruk", label: "Mimpi buruk", key: "mimpiBuruk" },
                        { id: "tidakPercayaDiri", label: "Tidak percaya diri", key: "tidakPercayaDiri" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={item.id}
                            checked={rekamPsikologiForm[item.key as keyof typeof rekamPsikologiForm] as boolean}
                            onCheckedChange={(checked) => setRekamPsikologiForm({...rekamPsikologiForm, [item.key]: checked as boolean})}
                          />
                          <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Asesmen Lanjutan</h3>
                    <div className="space-y-2">
                      <Label htmlFor="psikotensPendukung">Psikotes Pendukung</Label>
                      <Textarea
                        id="psikotensPendukung"
                        value={rekamPsikologiForm.psikotensPendukung}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, psikotensPendukung: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dinamikaPsikologi">Dinamika Psikologi</Label>
                      <Textarea
                        id="dinamikaPsikologi"
                        value={rekamPsikologiForm.dinamikaPsikologi}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, dinamikaPsikologi: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diagnosaPsikologi">Diagnosa Psikologi</Label>
                      <Textarea
                        id="diagnosaPsikologi"
                        value={rekamPsikologiForm.diagnosaPsikologi}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, diagnosaPsikologi: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rencanaIntervensi">Rencana Intervensi Psikologi</Label>
                      <Textarea
                        id="rencanaIntervensi"
                        value={rekamPsikologiForm.rencanaIntervensi}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, rencanaIntervensi: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="intervensiPsikologi">Intervensi Psikologi</Label>
                      <Textarea
                        id="intervensiPsikologi"
                        value={rekamPsikologiForm.intervensiPsikologi}
                        onChange={(e) => setRekamPsikologiForm({...rekamPsikologiForm, intervensiPsikologi: e.target.value})}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Tindakan Orang Tua Sebelum Pertemuan</h3>
                    {tindakanOrangTua.map((tindakan, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Label>Penanganan</Label>
                          <Input
                            value={tindakan.penanganan}
                            onChange={(e) => {
                              const newTindakan = [...tindakanOrangTua];
                              newTindakan[index].penanganan = e.target.value;
                              setTindakanOrangTua(newTindakan);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Nama Dokter/Psikolog/Terapis</Label>
                          <Input
                            value={tindakan.namaDokter}
                            onChange={(e) => {
                              const newTindakan = [...tindakanOrangTua];
                              newTindakan[index].namaDokter = e.target.value;
                              setTindakanOrangTua(newTindakan);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Kapan</Label>
                          <Input
                            value={tindakan.kapan}
                            onChange={(e) => {
                              const newTindakan = [...tindakanOrangTua];
                              newTindakan[index].kapan = e.target.value;
                              setTindakanOrangTua(newTindakan);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hasil Diagnosis/Penanganan/Obat</Label>
                          <Input
                            value={tindakan.hasil}
                            onChange={(e) => {
                              const newTindakan = [...tindakanOrangTua];
                              newTindakan[index].hasil = e.target.value;
                              setTindakanOrangTua(newTindakan);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setTindakanOrangTua([...tindakanOrangTua, { penanganan: "", namaDokter: "", kapan: "", hasil: "" }])}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Tindakan
                    </Button>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Riwayat Terapi yang Dijalankan Anak</h3>
                    {riwayatTerapi.map((terapi, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Label>Jenis Terapi</Label>
                          <Input
                            value={terapi.jenisTerapi}
                            onChange={(e) => {
                              const newTerapi = [...riwayatTerapi];
                              newTerapi[index].jenisTerapi = e.target.value;
                              setRiwayatTerapi(newTerapi);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Berapa Lama</Label>
                          <Input
                            value={terapi.berapa}
                            onChange={(e) => {
                              const newTerapi = [...riwayatTerapi];
                              newTerapi[index].berapa = e.target.value;
                              setRiwayatTerapi(newTerapi);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Dimana</Label>
                          <Input
                            value={terapi.dimana}
                            onChange={(e) => {
                              const newTerapi = [...riwayatTerapi];
                              newTerapi[index].dimana = e.target.value;
                              setRiwayatTerapi(newTerapi);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setRiwayatTerapi([...riwayatTerapi, { jenisTerapi: "", berapa: "", dimana: "" }])}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Riwayat Terapi
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4 mt-4 border-t">
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
            Pencarian Arsip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari berdasarkan ID, nama, atau diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
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
                  <TableHead>ID Arsip</TableHead>
                  <TableHead>Nama Pasien</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Tanggal Registrasi</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell>{item.diagnosis}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(item.tanggalRegistrasi).toLocaleDateString('id-ID')}
                      </div>
                    </TableCell>
                    <TableCell>{item.dokter}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.status === 'Aktif' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
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
