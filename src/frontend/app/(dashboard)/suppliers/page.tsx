'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/shared/components/ui/drawer';
import { Label } from '@/shared/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  phone: string | null;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data.suppliers || []);
    } catch (error) {
      console.error('Error loading suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedSupplier(null);
    setFormData({ name: '', phone: '' });
    setDrawerOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      name: supplier.name,
      phone: supplier.phone || '',
    });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone || null,
      };

      const url = selectedSupplier ? `/api/suppliers/${selectedSupplier.id}` : '/api/suppliers';
      const method = selectedSupplier ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Erro ao salvar fornecedor');
        return;
      }

      setDrawerOpen(false);
      loadSuppliers();
    } catch (error) {
      console.error('Error saving supplier:', error);
      alert('Erro ao salvar fornecedor');
    }
  };

  const handleDelete = async () => {
    if (!selectedSupplier) return;

    try {
      const response = await fetch(`/api/suppliers/${selectedSupplier.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert('Erro ao excluir fornecedor');
        return;
      }

      setDeleteDialogOpen(false);
      setSelectedSupplier(null);
      loadSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
      alert('Erro ao excluir fornecedor');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fornecedores</h1>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">Nenhum fornecedor encontrado</TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.phone || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(supplier)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Drawer de criação/edição */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side="right">
        <DrawerContent onClose={() => setDrawerOpen(false)} className="w-full sm:w-[500px]">
          <DrawerHeader>
            <DrawerTitle>
              {selectedSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
            </DrawerTitle>
          </DrawerHeader>

          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome do fornecedor"
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefone (opcional)</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 1234-5678"
              />
            </div>
          </div>

          <DrawerFooter>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Fornecedor</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o fornecedor "{selectedSupplier?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


