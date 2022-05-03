import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Row } from "../components/InsertRow";

import { useSiteMetadatas } from "../tools/useSiteMetadatas";
import PostsBlock from "@BlockBuilder/PostsBlock";
import HeadingBlock from "@BlockBuilder/HeadingBlock";

import MainTemplateWrapper from "@BlockBuilder/MainTemplateWrapper";

import { defaultSchema } from "../configs/schemas";

const IndexPage = props => {
  const [btnRef, setBtnRef] = useState("btn01");
  const handleSetBtnRef = ref => {
    setBtnRef(ref);
  };
  const btnHandler = btn => {
    handleSetBtnRef(btn);
  };

  const {
    site,
    bannerContent,
    boilerplateLogo,
    profileOficial,
    diamond,
    diamondBg,
    githubImg,
    instaImg,
    twitterImg,
    whatsImg,
  } = useSiteMetadatas();
  const { data } = props;
  const posts = data.allMarkdownRemark.edges;

  const findItemFeatured = postsList => {
    let x = null;

    x = [];
    postsList.map(e => {
      if (e.node.frontmatter.featuredPost === true) {
        x.push(e);
      }
    });

    return x;
  };

  const findItemhomeHighlight = postsList => {
    let x = null;

    x = [];
    postsList.map(e => {
      console.log(e.node.frontmatter);
      if (e.node.frontmatter.homeHighlight === true) {
        x.push(e);
      }
    });

    return x;
  };

  const findItemhomeHighlightRelated = postsList => {
    let x = null;

    x = [];
    postsList.map(e => {
      if (e.node.frontmatter.homeHighlightRelated === true) {
        x.push(e);
      }
    });

    return x;
  };

  const findItemhomeHighlightRelatedList = postsList => {
    let x = null;

    x = [];
    postsList.map(e => {
      if (e.node.frontmatter.homeHighlightRelatedList === true) {
        x.push(e);
      }
    });

    return x;
  };

  const featuredPosts = findItemFeatured(posts);
  const homeHighlightPost = findItemhomeHighlight(posts);
  const homeHighlightRelatedPost = findItemhomeHighlightRelated(posts);
  const homeHighlightRelatedListPost = findItemhomeHighlightRelatedList(posts);
  const imageQuery = getImage(bannerContent.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);
  const profileQuery = getImage(profileOficial.childrenImageSharp[0]);
  const diamondQuery = getImage(diamond.childrenImageSharp[0]);
  const diamondBgQuery = getImage(diamondBg.childrenImageSharp[0]);
  const githubGetImg = getImage(githubImg.childrenImageSharp[0]);
  const instaGetImg = getImage(instaImg.childrenImageSharp[0]);
  const twitterGetImg = getImage(twitterImg.childrenImageSharp[0]);
  const whatsGetImg = getImage(whatsImg.childrenImageSharp[0]);

  var updatedDate = new Date(homeHighlightPost[0].node.frontmatter.updated);
  var now = new Date();
  var hours = updatedDate.getHours();
  var mins = updatedDate.getMinutes();
  var secs = updatedDate.getSeconds();
  var difference_In_Time = now.getTime() - updatedDate.getTime();
  var difference_In_Days = difference_In_Time / (1000 * 60 * 60 * 24);
  var countOneDay = difference_In_Days >= 1 ? true : false;
  return (
    <MainTemplateWrapper
      logo={
        <GatsbyImage
          image={logoQuery}
          alt={"title"}
          placeholder={"NONE"}
          critical='true'
          className={""}
        />
      }
      seoSchema={defaultSchema(props.location)}
    >
      <Row
        opt={{ classes: "banner colorME", isBoxed: true, role: "something" }}
      >
        <GatsbyImage
          image={imageQuery}
          alt={"title"}
          placeholder={"NONE"}
          critical='true'
          className={" banner-img"}
        />
      </Row>

      <main className='main-container' id='site-content' role='list'>
        <span id='perfil' />
        <HeadingBlock classes='m30auto hack' importance={10} width={400}>
          Simone Tebet
        </HeadingBlock>
        <Row opt={{ classes: "home-infos", isBoxed: true, role: "something" }}>
          <section className='main-page-wrapper'>
            <Row opt={{ classes: "", numColumns: 2 }}>
              <div className='main-article'>
                <h4>
                  {homeHighlightPost[0].node.frontmatter.categories.map(el => {
                    return (
                      <Link
                        to={"/category/" + el}
                        className='main-article-categories'
                      >
                        {el}
                      </Link>
                    );
                  })}
                </h4>
                <h1>
                  <Link to={homeHighlightPost[0].node.fields.slug}>
                    {homeHighlightPost[0].node.frontmatter.title}
                  </Link>
                </h1>
                <Link
                  to={homeHighlightPost[0].node.fields.slug}
                  className='main-article-caption'
                ></Link>
                {countOneDay === false ? (
                  <p>
                    Atualizado{" "}
                    {hours +
                      " horas, " +
                      mins +
                      " minutos e " +
                      secs +
                      " segundos atrás"}
                  </p>
                ) : (
                  ""
                )}

                <div className='main-article-relatives'>
                  <h2>
                    <Link to={homeHighlightRelatedPost[0].node.fields.slug}>
                      {homeHighlightRelatedPost[0].node.frontmatter.title}
                    </Link>
                  </h2>

                  <ul>
                    {homeHighlightRelatedListPost.map(e => {
                      return (
                        <li>
                          <Link to={e.node.fields.slug}>
                            {e.node.frontmatter.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className='home-profile-wrapper'>
                <Row
                  opt={{
                    isBoxed: true,
                    role: "something",
                    classes: "home-profile home-profile-width",
                    numColumns: 2,
                  }}
                >
                  <div className='home-profile-left-column'>
                    <p>
                      <strong>Total Redundante de Seguidores: </strong>150
                      <sup>*</sup>
                    </p>
                    <p>
                      <strong>Intenção de votos: </strong>2%
                    </p>
                    <p>
                      <strong>Coligação conhecida: </strong>MDB, PSDB, CNN
                    </p>
                    <p>
                      <strong>Experiência política: </strong>30 anos
                    </p>
                    <GatsbyImage
                      image={githubGetImg}
                      alt={"title"}
                      placeholder={"NONE"}
                      critical='true'
                      className={" profile-socials"}
                    />
                    <GatsbyImage
                      image={instaGetImg}
                      alt={"title"}
                      placeholder={"NONE"}
                      critical='true'
                      className={" profile-socials"}
                    />
                    <GatsbyImage
                      image={twitterGetImg}
                      alt={"title"}
                      placeholder={"NONE"}
                      critical='true'
                      className={" profile-socials"}
                    />
                    <GatsbyImage
                      image={whatsGetImg}
                      alt={"title"}
                      placeholder={"NONE"}
                      critical='true'
                      className={" profile-socials"}
                    />

                    <div className='left-bottom'>
                      <ul className='profile-anchor-menu'>
                        <li>
                          <a
                            href='/#perfil'
                            className={`btn01 ${
                              btnRef === "btn01" ? "active" : ""
                            }`}
                            onClick={() => btnHandler("btn01")}
                          >
                            Histórico
                          </a>
                        </li>
                        <li>
                          <a
                            href='/#perfil'
                            className={`btn02 ${
                              btnRef === "btn02" ? "active" : ""
                            }`}
                            onClick={() => btnHandler("btn02")}
                          >
                            Profissão
                          </a>
                        </li>
                        <li>
                          <a
                            href='/#perfil'
                            className={`btn03 ${
                              btnRef === "btn03" ? "active" : ""
                            }`}
                            onClick={() => btnHandler("btn03")}
                          >
                            Família
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='home-profile-right-column'>
                    <div className='diamond-profile'>
                      <GatsbyImage
                        image={profileQuery}
                        alt={"title"}
                        placeholder={"NONE"}
                        critical='true'
                        className={"diamond-img"}
                        style={{
                          WebkitMaskImage: `url(${diamondQuery.images.fallback.src})`,
                        }}
                      />
                      <GatsbyImage
                        image={diamondBgQuery}
                        alt={"title"}
                        placeholder={"NONE"}
                        critical='true'
                        className={"diamond-background"}
                        style={{
                          width: "190px",
                          height: "190px",
                        }}
                      />
                    </div>
                    <div className='home-profile-infos'>
                      <Link to='/' className='profile-btn'>
                        + Apoiar
                      </Link>
                      <Link to='/' className='profile-btn'>
                        + Seguir
                      </Link>
                    </div>
                  </div>
                </Row>
                <Row
                  opt={{
                    isBoxed: true,
                    bgColor: "white",
                    classes: "home-profile-bottom home-profile-width",
                  }}
                >
                  <div
                    className={`home-profile-tab ${
                      btnRef === "btn01" ? "" : "hide-me"
                    }`}
                  >
                    <h2>Histórico</h2>
                    <p>
                      Simone Tebet, 52 anos, é natural de Três Lagoas, Minas
                      Gerais.
                    </p>
                    <p>
                      Filha de um político de ascendência libanesa, que também
                      foi professor, advogado, promotor de justiça, sociólogo.
                    </p>
                    <p>
                      Destaca-se na política pelo seu notório saber jurídico e
                      posicionamentos firmes. Simone é advogada, professora
                      universitária e política. Formou-se em Direito pela
                      Universidade Federal do Rio de Janeiro. É especialista em
                      Ciência do Direito pela Escola Superior de Magistratura.
                    </p>
                  </div>
                  <div
                    className={`home-profile-tab ${
                      btnRef === "btn02" ? "" : "hide-me"
                    }`}
                  >
                    <h2>Profissão</h2>
                    <p>
                      Começou sua vida profissional aos 22 anos como professora
                      universitária em seu Estado, no ano de 1992, atividade que
                      exerceu por 12 anos. Trabalhou na Universidade Federal de
                      Mato Grosso do Sul, Universidade Católica Dom Bosco,
                      Universidade para o Desenvolvimento do Estado e Região do
                      Pantanal e Faculdades Integradas de Campo Grande.
                    </p>
                    <p>
                      Foi consultora técnica jurídica da Assembleia Legislativa
                      do Mato Grosso do Sul entre os anos de 1995 e 1997 e foi
                      diretora técnica legislativa entre 1997 e 2001.
                    </p>
                  </div>
                  <div
                    className={`home-profile-tab ${
                      btnRef === "btn03" ? "" : "hide-me"
                    }`}
                  >
                    <h2>Família Tebet</h2>
                    <p>
                      Tal como o pai, falecido, a filha possue vida pública por
                      meio do Movimento Democrático Brasileiro (MDB). A senadora
                      entrou efetivamente na política ao ser eleita aos 31 anos
                      como Deputada Estadual, pelo então PMDB.
                    </p>
                    <p>
                      Simone Tebet têm duas filhas e é casada com o político
                      Eduardo Rocha, deputado estadual pelo estado do Mato
                      Grosso do Sul. A declaração de bens de ambos é superior a
                      3 milhões de reais.
                    </p>
                  </div>
                </Row>
              </div>
            </Row>
          </section>
        </Row>
        <HeadingBlock classes='m30auto hack' importance={9} width={400}>
          Destaques da Simone
        </HeadingBlock>
        <Row opt={{ isBoxed: true, classes: "main-container-wrapper" }}>
          <PostsBlock
            postsPerPage={site.siteMetadata.postsPerPage}
            postList={featuredPosts}
            typeLoad={"push"} // or false
            // readMoreText="Ler Mais"
            pagination={{
              loadMoreBtn: true,
              loadMore: "Ler Mais",
            }}
            classes='colorME'
          />
        </Row>
        <HeadingBlock classes='m30auto' importance={9} width={400}>
          Crie o seu próprio site
        </HeadingBlock>
        <Row
          opt={{ classes: "banner colorME", isBoxed: true, role: "something" }}
        >
          <GatsbyImage
            image={imageQuery}
            alt={"title"}
            placeholder={"NONE"}
            critical='true'
            className={" banner-img"}
          />
        </Row>
        <HeadingBlock classes='m30auto' importance={9} width={400}>
          Últimas Postagens
        </HeadingBlock>
        <Row opt={{ isBoxed: true, classes: "main-container-wrapper" }}>
          <PostsBlock
            postsPerPage={site.siteMetadata.postsPerPage}
            postList={posts}
            typeLoad={"push"} // or false
            // readMoreText="Ler Mais"
            pagination={{
              loadMoreBtn: true,
              loadMore: "Ler Mais",
            }}
            classes='colorME'
          />
        </Row>
      </main>
    </MainTemplateWrapper>
  );
};

export default IndexPage;

export const queryAtividade = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 900
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
            updated: date
            title
            headline
            categories
            featuredPost
            homeHighlight
            homeHighlightRelated
            homeHighlightRelatedList
            featuredImage {
              childrenImageSharp {
                gatsbyImageData(
                  width: 400
                  height: 200
                  placeholder: DOMINANT_COLOR
                  quality: 100
                )
              }
            }
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;
