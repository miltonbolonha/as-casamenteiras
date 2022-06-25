import React from "react";
import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { defaultSchema } from "../configs/schemas";
import { getSrc } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const Documentacao = ({ location }) => {
  const { bgPatternImg } = useSiteMetadatas();
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);

  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      seoSchema={defaultSchema(location)}
      title='Documentação'
    >
      <h2>Glossário</h2>
      <p>Palavras-chave.</p>
      <h2>Pronto para começar</h2>
      <p>Palavras-chave.</p>
    </MainPageWrapper>
  );
};

export default Documentacao;
