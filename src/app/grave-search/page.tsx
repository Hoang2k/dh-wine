import SearchFormComponent from "@/components/search/SearchFormComponent";
import TableComponent from "@/components/search/TableComponent";

export default function GraveSearchPage() {
    return (
        <div className="min-h-screen bg-[#EBFFEF80] bg-gradient-to-br from-memorial-cream to-background">
        <main className="container mx-auto md:px-8 py-8">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-memorial-dark mb-2">
              "Sống bám đá đánh giặc"
            </h1>
            <p className="text-memorial-gray text-3xl">
              "Chết hóa đá bất tử"
            </p>
          </div>
  
          {/* Search Form */}
        <SearchFormComponent />
        <TableComponent />

        </main>
      </div>
    )
}