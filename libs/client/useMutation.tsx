import { useState } from "react";

interface EnterForm {
  email?: string;
  phone?: string;
}


export default function useMutation(
  url: string
): [
  (data?: EnterForm) => void,
  { loading: boolean; data: undefined | any; error: undefined | any }
] {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const { loading, data, error } = state;
  function mutation(data?: EnterForm) {
    setState({ ...state, loading: true });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) =>
        setState({
          ...state,
          data: json,
        })
      )
      .catch((error) => setState({ ...state, error }))
      .finally(() =>
        setState({
          ...state,
          loading: false,
        })
      );
  }
  return [mutation, { loading, data, error }];
}

