import React, { useState, createContext } from "react";

export const KuponContext = createContext();

export const KuponProvider = (props) => {
  const [kullanici_adi, setKullaniciAdi] = useState(
    localStorage.getItem("kullanici_adi")
  );
  const [kupon, setKupon] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [kullaniciAyar, setKullaniciAyar] = useState(false);
  const [bakiye, setBakiye] = useState(0);

  return (
    <KuponContext.Provider
      value={[
        kupon,
        setKupon,
        kullanici_adi,
        setKullaniciAdi,
        openPanel,
        setOpenPanel,
        kullaniciAyar,
        setKullaniciAyar,
        bakiye,
        setBakiye
      ]}
    >
      {props.children}
    </KuponContext.Provider>
  );
};
