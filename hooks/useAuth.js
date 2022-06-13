import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const config = {
  expoClientId:
    "961635858269-i23fl2v55l3jqia14st7gun45ahvj2in.apps.googleusercontent.com",
  androidClientId:
    "961635858269-vgaec97ei7vgbog1hdt5pv4g9q7mvtuv.apps.googleusercontent.com",
  iosClientId:
    "961635858269-t4mbdj1urof8ibesrt746i583a96vd40.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (response?.type === "success") {
      setLoading(true);
      const { id_token, access_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credential);
      setLoading(false);
    }
  }, [response]);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      signInWithGoogle: promptAsync,
      logout,
    }),
    [user, logout, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
