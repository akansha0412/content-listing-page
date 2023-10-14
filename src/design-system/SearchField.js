import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { InputAdornment, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";

const CustomeTextField = styled(TextField)({
  width: "100%",
  border: `solid 1px #ffffff`,
  borderRadius: "4px",
  color: "#ffffff",
});

const CloseIcon = styled(Close)({
  cursor: "pointer",
  width: "20px",
  fill: "#ffffff",
  marginTop: "5px",
});

export function SearchField({ onSearch, placeholder }) {
  const ref = useRef();
  const [state, setState] = useState({
    search: "",
  });
  const textFieldRef = (useRef < HTMLDivElement) | (null > null);

  useEffect(() => {
    ref.current = new Subject();
    ref.current
      .pipe(
        tap((search) => {
          setState((state) => ({ ...state, search }));
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((search) => {
        onSearch(search);
      });
    return () => ref.current?.unsubscribe();
  }, [onSearch]);

  function handleClearSearch() {
    setState({ ...state, search: "" });
    onSearch("");
  }

  function getInputStyles() {
    return { padding: "6px 14px 6px 0px", color: "#ffffff" };
  }

  return (
    <CustomeTextField
      id="searchField"
      value={state.search}
      onChange={(e) => ref.current?.next(e.target.value)}
      variant="outlined"
      placeholder={placeholder}
      onBlur={() => {
        if (state.search.length === 0) {
          setState((state) => ({ ...state, collapsed: true }));
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img
              src={` https://test.create.diagnal.com/images/search.png`}
              alt={"search"}
              style={{ height: "20px", width: "20px", marginLeft: "auto" }}
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <div>
              {state.search && <CloseIcon onClick={handleClearSearch} />}
            </div>
          </InputAdornment>
        ),
      }}
      inputProps={{
        style: getInputStyles(),
        ref: textFieldRef,
      }}
      InputLabelProps={{
        style: {
          color: "#ffffff", // Change placeholder color
        },
      }}
    />
  );
}
