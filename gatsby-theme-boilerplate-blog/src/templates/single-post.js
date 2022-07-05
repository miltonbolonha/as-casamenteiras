import React from "react";
import { graphql } from "gatsby";

import MainTemplateWrapper from "@BlockBuilder/MainTemplateWrapper";

import SinglePostBlock from "@BlockBuilder/SinglePostBlock";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

const SinglePost = ({ data, location }) => {
  const { imgHolder, bgPatternImg, boilerplateLogo, site } = useSiteMetadatas();
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  const logoQuery = getImage(boilerplateLogo.childrenImageSharp[0]);

  const post = data.markdownRemark;
  console.log("post::");
  console.log(post);
  return (
    <MainTemplateWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      logo={
        <GatsbyImage
          image={logoQuery}
          alt={"title"}
          placeholder={"NONE"}
          critical='true'
          className={""}
        />
      }
      classes='single-post'
      // seoSchema={articleSchema(data, location)}
      opt={{
        titleSeo: `${post.frontmatter.title}`,
        authorSeo: post.frontmatter.author,
        classes: "single-post",
        datePublished: post.frontmatter.date,
        schemaType: "article",
        featuredImage:
          site.siteMetadata.siteUrl +
          post.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
            .images.fallback.src,
        cardImage:
          post.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
            .images.fallback.src,
        articleBody: post.html,
        mainLogo: imgHolder,
        description: post.excerpt,
        serverUrl: location.origin || site.siteMetadata.siteUrl || "/",
        articleUrl: location.href,
        social: site.siteMetadata.social.twitter,
      }}
    >
      <main>
        <SinglePostBlock
          highlightImage={post?.frontmatter?.featuredImage}
          authorImg={imgHolder}
          date={post.frontmatter.updatedAt}
          author={post.frontmatter.author}
          html={post.html}
          title={post.frontmatter.title}
          categories={post.frontmatter.categories}
          timeToRead={post.timeToRead}
          wordCount={post.wordCount}
        />
      </main>
    </MainTemplateWrapper>
  );
};

export const query = graphql`
  query SinglePost($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        updatedAt(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
        author
        categories
        featuredPost
        featuredImage {
          childrenImageSharp {
            gatsbyImageData(
              width: 1200
              height: 627
              placeholder: NONE
              quality: 90
            )
          }
        }
      }
      excerpt(pruneLength: 200)
      html
      fields {
        slug
      }
      timeToRead
      wordCount {
        paragraphs
        sentences
        words
      }
    }
  }
`;

export default SinglePost;
