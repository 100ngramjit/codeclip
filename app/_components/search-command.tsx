import { useState, useCallback } from "react";
import Link from "next/link";
import debounce from "lodash/debounce";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import axiosInstance from "@/lib/axiosInstance";

function SearchCommand({ open, setOpen }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query) {
        const response = await axiosInstance.post("/api/search", {
          searchTerm: query,
        });
        const data = response.data;
        setSearchResults(data || []);
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: any) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={searchTerm}
        onChangeCapture={handleSearchChange}
      />
      <CommandList>
        {!searchResults.length ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : (
          <div>
            <h4 className="text-muted-foreground p-2">Search Results</h4>
            {searchResults.map((result: any, index) => (
              <div key={index} className="flex flex-col">
                <Link
                  href={`/feed/clip/${result.id}`}
                  replace
                  className="p-2 hover:bg-accent cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  {result.fileName}
                </Link>
              </div>
            ))}
          </div>
        )}
      </CommandList>
    </CommandDialog>
  );
}

export default SearchCommand;
