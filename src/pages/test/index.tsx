
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash"; // Import debounce từ lodash
import useAddressService from "../../services/useAddressService";


function Test() {
    const [input, setInput] = useState<string>("");
    const [suggestions, setSuggestions] = useState<{ place_id: string; description: string }[]>([]);
    const { fetchSuggestions, loading } = useAddressService();
  
    useEffect(() => {
      const debouncedFetch = debounce(async () => {
        const results = await fetchSuggestions(input);
        setSuggestions(results);
      }, 300);
  
      if (input) debouncedFetch();
      return () => debouncedFetch.cancel();
    }, [input, fetchSuggestions]);
  
    const handleSelectAddress = (description: string) => {
      setInput(description);
      console.log(input)
      setSuggestions([]);
    };

  return (
    <div className="relative w-full mx-auto">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập địa chỉ..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {loading && <div className="absolute bg-white text-gray-500 px-4 py-2">Đang tải...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelectAddress(item.description)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Test;
