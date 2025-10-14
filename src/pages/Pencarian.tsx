import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, FileText, Download } from "lucide-react";

const Pencarian = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - showing detailed patient records
  const allPatientData = [
    {
      idArsip: "A-2024-001",
      kodeArsip: "K-2024-001",
      tanggalArsip: "2024-01-15",
      namaPasien: "Maria Santos",
      dokter: "Dr. Tanti",
      diagnosa: "Depresi Ringan",
      file: "assessment_maria.pdf",
    },
    {
      idArsip: "A-2024-001",
      kodeArsip: "K-2024-001",
      tanggalArsip: "2024-01-15",
      namaPasien: "Ahmad Budi",
      dokter: "Dr. Lina",
      diagnosa: "Kecemasan",
      file: "assessment_ahmad.pdf",
    },
  ];

  const filteredData = allPatientData.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.idArsip.toLowerCase().includes(searchLower) ||
      item.kodeArsip.toLowerCase().includes(searchLower) ||
      item.namaPasien.toLowerCase().includes(searchLower) ||
      item.dokter.toLowerCase().includes(searchLower) ||
      item.diagnosa.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Pencarian Arsip Pasien</h1>
        <p className="text-muted-foreground">Gunakan fitur pencarian untuk menemukan arsip pasien dengan cepat</p>
      </div>

      <Card className="shadow-card border-0">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Cari ID Arsip, Kode, Nama Pasien, Dokter, atau Diagnosa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-base bg-muted/50 border-border focus:ring-2 focus:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Hasil Pencarian
          </CardTitle>
          <CardDescription>Menampilkan {filteredData.length} hasil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ID Arsip</TableHead>
                  <TableHead>Kode Arsip</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nama Pasien</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Diagnosa</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{item.idArsip}</TableCell>
                    <TableCell><Badge variant="outline">{item.kodeArsip}</Badge></TableCell>
                    <TableCell>{new Date(item.tanggalArsip).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell>{item.namaPasien}</TableCell>
                    <TableCell><Badge variant="secondary">{item.dokter}</Badge></TableCell>
                    <TableCell className="max-w-[200px] truncate">{item.diagnosa}</TableCell>
                    <TableCell><div className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /><span className="text-sm">{item.file}</span></div></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-secondary hover:bg-secondary/10"><Download className="h-4 w-4" /></Button>
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

export default Pencarian;
