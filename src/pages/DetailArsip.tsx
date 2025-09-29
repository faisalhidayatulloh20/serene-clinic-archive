import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  User,
  Calendar,
  FileText,
  Download,
  Edit,
  Brain,
  Heart,
  Activity,
  Clock,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const DetailArsip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, this would be fetched based on ID
  const [arsipData] = useState({
    id: "ARS001",
    nama: "Maria Santos",
    usia: 28,
    jenisKelamin: "Perempuan",
    diagnosis: "Gangguan Kecemasan",
    tanggal: "2024-01-15",
    psikolog: "Dr. Sarah Ahmad",
    kategori: "Konseling",
    status: "Aktif",
    
    // Biodata lengkap
    alamat: "Jl. Merdeka No. 123, Jakarta Pusat",
    noTelepon: "081234567890",
    email: "maria.santos@email.com",
    pendidikan: "S1 Psikologi",
    pekerjaan: "Marketing Executive",
    statusPernikahan: "Belum Menikah",
    riwayatMedis: "Tidak ada riwayat penyakit serius",
    
    // Hasil konseling
    diagnosisLengkap: `Pasien menunjukkan gejala gangguan kecemasan generalisata dengan tingkat keparahan sedang. 
    Gejala yang dialami meliputi kekhawatiran berlebihan terhadap berbagai aspek kehidupan, 
    kesulitan berkonsentrasi, ketegangan otot, dan gangguan tidur.`,
    
    rencanaPerawatan: `1. Terapi Kognitif Behavioral (CBT) selama 12 sesi
    2. Teknik relaksasi dan mindfulness
    3. Evaluasi progress setiap 4 sesi
    4. Konsultasi dengan psikiater jika diperlukan`,
    
    progressNotes: [
      {
        tanggal: "2024-01-15",
        sesi: 1,
        catatan: "Sesi awal assessment. Pasien kooperatif dan terbuka membahas masalah. Identifikasi trigger utama kecemasan."
      },
      {
        tanggal: "2024-01-22",
        sesi: 2,
        catatan: "Mulai implementasi teknik breathing dan grounding. Pasien menunjukkan respons positif."
      },
      {
        tanggal: "2024-01-29",
        sesi: 3,
        catatan: "Eksplorasi pola pikir negatif. Homework: thought record untuk minggu depan."
      }
    ],
    
    files: [
      {
        nama: "Assessment Awal.pdf",
        ukuran: "2.4 MB",
        tanggal: "15 Jan 2024",
        jenis: "Assessment"
      },
      {
        nama: "Progress Report 1.pdf",
        ukuran: "1.8 MB",
        tanggal: "22 Jan 2024",
        jenis: "Progress Report"
      },
      {
        nama: "CBT Worksheet.pdf",
        ukuran: "856 KB",
        tanggal: "29 Jan 2024",
        jenis: "Worksheet"
      }
    ]
  });

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{arsipData.nama}</h1>
            <Badge variant="outline" className="font-mono">
              {arsipData.id}
            </Badge>
            <Badge variant="secondary">
              {arsipData.kategori}
            </Badge>
            <Badge variant={arsipData.status === 'Aktif' ? 'default' : 'outline'}>
              {arsipData.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Detail arsip pasien klinik psikologi</p>
        </div>
        <Button className="bg-gradient-primary gap-2">
          <Edit className="w-4 h-4" />
          Edit Arsip
        </Button>
      </div>

      <Tabs defaultValue="biodata" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="biodata">Biodata Pasien</TabsTrigger>
          <TabsTrigger value="konseling">Hasil Konseling</TabsTrigger>
          <TabsTrigger value="progress">Progress Notes</TabsTrigger>
          <TabsTrigger value="files">File Arsip</TabsTrigger>
        </TabsList>

        {/* Biodata Tab */}
        <TabsContent value="biodata" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Informasi Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                    <p className="font-medium">{arsipData.nama}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Usia</p>
                    <p className="font-medium">{arsipData.usia} tahun</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                    <p className="font-medium">{arsipData.jenisKelamin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status Pernikahan</p>
                    <p className="font-medium">{arsipData.statusPernikahan}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Alamat</p>
                      <p className="font-medium">{arsipData.alamat}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">No. Telepon</p>
                      <p className="font-medium">{arsipData.noTelepon}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{arsipData.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-secondary" />
                  Informasi Konseling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pendidikan Terakhir</p>
                    <p className="font-medium">{arsipData.pendidikan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pekerjaan</p>
                    <p className="font-medium">{arsipData.pekerjaan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Diagnosis Awal</p>
                    <p className="font-medium">{arsipData.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Psikolog Penanggung Jawab</p>
                    <p className="font-medium">{arsipData.psikolog}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tanggal Konseling Pertama</p>
                      <p className="font-medium">{new Date(arsipData.tanggal).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card className="shadow-card border-0 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  Riwayat Medis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{arsipData.riwayatMedis}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hasil Konseling Tab */}
        <TabsContent value="konseling" className="space-y-6">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Diagnosis Lengkap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{arsipData.diagnosisLengkap}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" />
                Rencana Perawatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {arsipData.rencanaPerawatan.split('\n').map((line, index) => (
                  <p key={index} className="text-foreground leading-relaxed mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Notes Tab */}
        <TabsContent value="progress" className="space-y-6">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Catatan Progress Sesi
              </CardTitle>
              <CardDescription>
                Ringkasan dari setiap sesi konseling yang telah dilakukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {arsipData.progressNotes.map((note, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {note.sesi}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-foreground">Sesi {note.sesi}</p>
                        <Badge variant="outline" className="text-xs">
                          {new Date(note.tanggal).toLocaleDateString('id-ID')}
                        </Badge>
                      </div>
                      <p className="text-foreground leading-relaxed">{note.catatan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files" className="space-y-6">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-info" />
                File Arsip
              </CardTitle>
              <CardDescription>
                Dokumen dan file yang terkait dengan arsip pasien
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {arsipData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{file.nama}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{file.ukuran}</span>
                          <span>•</span>
                          <span>{file.tanggal}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {file.jenis}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Unduh
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailArsip;