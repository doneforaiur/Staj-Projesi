import React, {useState, createContext} from 'react';


export const KuponContext = createContext();

export const KuponProvider = props => {

  const [kullanici_adi, setKullaniciAdi] = useState("");
  const [kupon, setKupon] = useState([]);


  return(
    <KuponContext.Provider value={[ kupon, setKupon, kullanici_adi,setKullaniciAdi]}>
      {props.children}
    </KuponContext.Provider>

  );
}