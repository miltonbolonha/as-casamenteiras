import React from "react";
import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { defaultSchema } from "../configs/schemas";
import { getSrc } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const Biografia = ({ location }) => {
  const { bgPatternImg } = useSiteMetadatas();
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);

  return (
    <MainPageWrapper
      seoSchema={defaultSchema(location)}
      title='Biografia'
      classes='main-page-wrapper'
      backgroundImage={{
        src: bgPatternSrc,
      }}
    >
      <p>As Casamenteiras frase de impacto.</p>
      <h2>Quem são As Casamenteiras?</h2>

      <p>As Casamenteiras é...</p>

      <p>As Casamenteiras iniciou a sua trajetória...</p>
      <p>
        No ramo casamenteiro, destaque entre parceiros (o que falam de As
        Casamenteias).
      </p>

      <h2>Origem</h2>

      <p>De origem afrodizíaca.</p>

      <p>As Casamenteiras ...</p>

      <p>Começou sua vida profissional como ... e.</p>

      <p>Trabalhou como .</p>

      <p>
        Note de rodapé referência{" "}
        <sup>
          <a name='ref1' href='#myfootnote1' id='ref1'>
            1
          </a>
        </sup>{" "}
      </p>

      <sup id='myfootnote1' name='myfootnote1'>
        1. Some: Existe sim.{" "}
        <a href='#ref1' title='Voltar para footnote 1.'>
          ↩
        </a>
      </sup>
    </MainPageWrapper>
  );
};

export default Biografia;
