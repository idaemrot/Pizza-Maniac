"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';

interface Product {
  _id: string;
  category: 'Pizza' | 'Drink';
  name: string;
  price: number;
  stock: number;
  isAvailable: boolean;
}

const ProductManagerPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Pizza' | 'Drink'>('Pizza');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to fetch products.');
    }
  };

  const resetForm = () => {
    setName('');
    setCategory('Pizza');
    setPrice(0);
    setStock(0);
    setIsAvailable(true);
    setCurrentProduct(null);
    setMessage('');
  };

  const handleAddProduct = async () => {
    setMessage('');
    try {
      await api.post('/products', { name, category, price, stock, isAvailable });
      setMessage('Product added successfully!');
      fetchProducts();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to add product.');
    }
  };

  const handleEditProduct = async () => {
    setMessage('');
    if (!currentProduct) return;
    try {
      await api.put(`/products/${currentProduct._id}`, { name, category, price, stock, isAvailable });
      setMessage('Product updated successfully!');
      fetchProducts();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to update product.');
    }
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
    setIsAvailable(product.isAvailable);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-4">
      <h3 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Product Manager</h3>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2">
              <PlusCircle size={18} /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">{currentProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription className="text-gray-600">
                {currentProduct ? 'Make changes to the product here.' : 'Fill in the details for a new product.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 rounded-lg" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select value={category} onValueChange={(value: 'Pizza' | 'Drink') => setCategory(value)}>
                  <SelectTrigger className="col-span-3 rounded-lg">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pizza">Pizza</SelectItem>
                    <SelectItem value="Drink">Drink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="col-span-3 rounded-lg" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">Stock</Label>
                <Input id="stock" type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} className="col-span-3 rounded-lg" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isAvailable" className="text-right">Available</Label>
                <Switch
                  id="isAvailable"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={currentProduct ? handleEditProduct : handleAddProduct} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                {currentProduct ? 'Save changes' : 'Add Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-xl shadow-md border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50 hover:bg-blue-100">
                <TableHead className="text-blue-700">Name</TableHead>
                <TableHead className="text-blue-700">Category</TableHead>
                <TableHead className="text-blue-700">Price</TableHead>
                <TableHead className="text-blue-700">Stock</TableHead>
                <TableHead className="text-blue-700">Available</TableHead>
                <TableHead className="text-right text-blue-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-800">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.isAvailable ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)} className="text-blue-500 hover:text-blue-700 rounded-full">
                      <Edit size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagerPage;