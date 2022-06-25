import React from "react";
import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { defaultSchema } from "../configs/schemas";
import { getSrc } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const Contato = ({ location }) => {
  const { bgPatternImg } = useSiteMetadatas();
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);

  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      seoSchema={defaultSchema(location)}
      title='Contato'
    >
      <h2>Fale Conosco</h2>
      <p>Sem falar.</p>
    </MainPageWrapper>
  );
};

export default Contato;
