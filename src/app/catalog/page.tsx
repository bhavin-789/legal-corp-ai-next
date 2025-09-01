"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GPTCard } from "@/components/catalog/gpt-card";
import { SearchFilter } from "@/components/catalog/search-filter";
import { gpts, GPT } from "@/data/gpts";
import { authManager } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Star, Crown } from "lucide-react";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const router = useRouter();
  const { isAuthenticated, user } = authManager.getState();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Get available categories for filters
  const availableCategories = useMemo(() => {
    const categories = [...new Set(gpts.map(gpt => gpt.category))];
    return categories.sort();
  }, []);

  // Filter GPTs based on search and filters
  const filteredGPTs = useMemo(() => {
    let filtered = gpts;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(gpt =>
        gpt.name.toLowerCase().includes(query) ||
        gpt.description.toLowerCase().includes(query) ||
        gpt.tags.some(tag => tag.toLowerCase().includes(query)) ||
        gpt.category.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(gpt => activeFilters.includes(gpt.category));
    }

    // Filter by user plan
    if (user && user.plan === 'free') {
      // Free users can only access non-Pro GPTs
      filtered = filtered.filter(gpt => !gpt.isPro);
    }

    return filtered;
  }, [searchQuery, activeFilters, user]);

  // Group GPTs by category
  const groupedGPTs = useMemo(() => {
    const grouped = filteredGPTs.reduce((acc, gpt) => {
      if (!acc[gpt.category]) {
        acc[gpt.category] = [];
      }
      acc[gpt.category].push(gpt);
      return acc;
    }, {} as Record<string, GPT[]>);

    // Sort categories by number of GPTs
    const sortedCategories = Object.keys(grouped).sort((a, b) => 
      grouped[b].length - grouped[a].length
    );

    return sortedCategories.map(category => ({
      category,
      gpts: grouped[category]
    }));
  }, [filteredGPTs]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container-default px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Catálogo de GPTs Especializados
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Accede a {user?.plan === 'free' ? '3' : '20'} asistentes legales especializados en derecho boliviano
              </p>
              
              {/* User Plan Badge */}
              <div className="flex justify-center items-center space-x-2 mb-6">
                <span className="text-sm text-muted-foreground">Tu plan actual:</span>
                <Badge variant={user?.plan === 'free' ? 'secondary' : 'default'} className="flex items-center space-x-1">
                  {user?.plan === 'free' ? (
                    <Bot className="h-3 w-3" />
                  ) : user?.plan === 'pro' ? (
                    <Star className="h-3 w-3" />
                  ) : (
                    <Crown className="h-3 w-3" />
                  )}
                  <span className="capitalize">{user?.plan}</span>
                </Badge>
                {user?.plan === 'free' && (
                  <Button variant="link" size="sm" asChild>
                    <a href="/pricing">Actualizar a Pro</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b">
          <div className="container-default px-4">
            <div className="max-w-2xl mx-auto">
              <SearchFilter
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                availableFilters={availableCategories}
                activeFilters={activeFilters}
              />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container-default px-4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">
                  {filteredGPTs.length} Asistente{filteredGPTs.length !== 1 ? 's' : ''} Legal{filteredGPTs.length !== 1 ? 'es' : ''}
                </h2>
                <p className="text-muted-foreground">
                  {searchQuery && `Buscando "${searchQuery}"`}
                  {activeFilters.length > 0 && ` en ${activeFilters.join(', ')}`}
                </p>
              </div>
            </div>

            {/* GPTs Grid */}
            {groupedGPTs.length > 0 ? (
              <div className="space-y-12">
                {groupedGPTs.map(({ category, gpts: categoryGPTs }) => (
                  <div key={category}>
                    <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                      <span>{category}</span>
                      <Badge variant="outline">{categoryGPTs.length}</Badge>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryGPTs.map((gpt) => (
                        <GPTCard
                          key={gpt.id}
                          id={gpt.id}
                          name={gpt.name}
                          description={gpt.description}
                          category={gpt.category}
                          tags={gpt.tags}
                          isPro={gpt.isPro}
                          isPopular={gpt.isPopular}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <Bot className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || activeFilters.length > 0
                    ? "Intenta ajustar tu búsqueda o filtros"
                    : "No hay GPTs disponibles para tu plan actual"
                  }
                </p>
                {(searchQuery || activeFilters.length > 0) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilters([]);
                    }}
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Upgrade CTA for Free Users */}
        {user?.plan === 'free' && (
          <section className="py-12 bg-primary/5">
            <div className="container-default px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Desbloquea Todos los GPTs Especializados
                </h3>
                <p className="text-muted-foreground mb-6">
                  Actualiza al plan Pro para acceder a los 20 GPTs especializados y disfrutar 
                  de características avanzadas como exportación de documentos y soporte prioritario.
                </p>
                <Button size="lg" asChild>
                  <a href="/pricing">
                    Ver Planes
                  </a>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}