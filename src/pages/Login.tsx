import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Heart, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would make an API call
    localStorage.setItem("user", JSON.stringify({ username: formData.username, role: formData.role }));
    navigate("/dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    localStorage.setItem("user", JSON.stringify({ username: formData.username, role: formData.role }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-soft">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Klinik Psikologi Sehat Mental</h1>
          <p className="text-muted-foreground">Sistem Informasi Arsip Digital</p>
        </div>

        <Card className="shadow-card border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Selamat Datang</CardTitle>
            <CardDescription>
              Silakan masuk atau daftar untuk mengakses sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Masukkan username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      required
                      className="border-border focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      className="border-border focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger className="border-border focus:ring-primary">
                        <SelectValue placeholder="Pilih role Anda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-destructive" />
                            Admin
                          </div>
                        </SelectItem>
                        <SelectItem value="psikolog">
                          <div className="flex items-center">
                            <Brain className="w-4 h-4 mr-2 text-primary" />
                            Psikolog
                          </div>
                        </SelectItem>
                        <SelectItem value="staf">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-2 text-secondary" />
                            Staf Klinik
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-300">
                    Masuk
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">Username</Label>
                    <Input
                      id="reg-username"
                      type="text"
                      placeholder="Buat username baru"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      required
                      className="border-border focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Buat password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      className="border-border focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-role">Role</Label>
                    <Select onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger className="border-border focus:ring-primary">
                        <SelectValue placeholder="Pilih role Anda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-destructive" />
                            Admin
                          </div>
                        </SelectItem>
                        <SelectItem value="psikolog">
                          <div className="flex items-center">
                            <Brain className="w-4 h-4 mr-2 text-primary" />
                            Psikolog
                          </div>
                        </SelectItem>
                        <SelectItem value="staf">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-2 text-secondary" />
                            Staf Klinik
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-secondary hover:shadow-hover transition-all duration-300">
                    Daftar
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          © 2024 Klinik Psikologi Sehat Mental. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;