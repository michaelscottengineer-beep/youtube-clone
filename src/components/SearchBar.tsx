import { Keyboard, Menu, Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import searchVideos from "@/api/queries/searchVideos";
import getAutoComplete from "@/api/queries/getAutoComplete";

const SearchBar = () => {
  const [search] = useSearchParams();
  const [term, setTerm] = useState(search.get("search_query"));
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function search() {
      if (!term) return;
      const data = await getAutoComplete(term);
      setSearchResults(data)
      console.log('search resluts', data)
    }
    // search();
  }, [term]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!term) {
      throw new Error("please provide term");
    }

    console.log(term);
    const data = await searchVideos(term);
    console.log(data);
    navigate("/results?search_query=" + term);
  };

  const handleChangeTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="searchbar ml-3 flex-1 max-w-[500px]"
    >
      <ButtonGroup className="rounded-full w-full">
        <InputGroup className="rounded-full relative">
          <InputGroupInput
            id="url"
            placeholder="Tìm kiếm"
            value={term ?? ""}
            onChange={handleChangeTerm}
          />
          <InputGroupAddon align={"inline-end"}>
            <Keyboard />
          </InputGroupAddon>

          {term && (
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton aria-label="Copy" title="Copy" size="icon-xs">
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          )}
          {/* <div className="absolute top-full">
          {searchResults.map(r => {
            return <div key={r.id.}>{}</div>
          })}
          </div> */}
        </InputGroup>
        <Button
          className="rounded-full bg-accent/50 "
          variant={"outline"}
          onClick={() => {
            console.log(123);
          }}
          type="submit"
        >
          <Search />
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default SearchBar;
