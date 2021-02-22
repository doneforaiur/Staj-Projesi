import React, {useState, createContext} from 'react';


export const KuponContext = createContext();

export const KuponProvider = props => {

  const [kullanici_adi, setKullaniciAdi] = useState("");
  const [kupon, setKupon] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [kullaniciAyar, setKullaniciAyar] = useState(false);


  return(
    <KuponContext.Provider value={[ kupon, setKupon, kullanici_adi,setKullaniciAdi, openPanel, setOpenPanel, kullaniciAyar, setKullaniciAyar]}>
      {props.children}
    </KuponContext.Provider>

  );
}

