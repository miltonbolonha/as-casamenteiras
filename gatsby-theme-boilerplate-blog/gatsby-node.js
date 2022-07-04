const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`);
const rootDir = path.join(__dirname, "../");
const businessInfos = require("./package.json");
// Adding slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    });

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(1)}`,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { date: { lt: "null" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
              title
              author
              featuredPost
              homeHighlight
              homeHighlightRelated
              homeHighlightRelatedList
              categories
              featuredImage {
                childrenImageSharp {
                  gatsbyImageData(
                    width: 350
                    height: 224
                    placeholder: NONE
                    quality: 100
                  )
                }
              }
            }
            excerpt(pruneLength: 200)
            htmlAst
          }
        }
      }
      categoriesGroup: allMarkdownRemark(
        filter: { frontmatter: { date: { lt: "null" } } }
        limit: 800
      ) {
        group(field: frontmatter___categories) {
          fieldValue
          nodes {
            headings {
              value
            }
            fields {
              slug
            }
            frontmatter {
              featuredImage {
                childrenImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
      allPages: allMarkdownRemark(
        filter: { frontmatter: { status: { eq: true } } }
      ) {
        edges {
          node {
            frontmatter {
              status
              template
              title
              description
              slug
              main_heading
              content_type
            }
            html
          }
        }
      }
    }
  `).then(result => {
    const pages = result.data.allPages.edges;

    pages.forEach(({ node }) => {
      if (node.frontmatter.status === true) {
        createPage({
          path: node.frontmatter.slug,
          component: path.resolve(
            rootDir,
            `gatsby-theme-boilerplate-blog/src/templates/${node.frontmatter.template}.js`
          ),
          context: {
            title: node.frontmatter.title,
            slug: node.frontmatter.slug,
            main_heading: node.frontmatter.main_heading,
            content_type: node.frontmatter.content_type,
            content: node.html,
          },
        });
      }
    });

    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(
          rootDir,
          "gatsby-theme-boilerplate-blog/src/templates/single-post.js"
        ),
        context: {
          slug: node.fields.slug,
        },
      });
    });

    const categories = result.data.categoriesGroup.group;
    // Make category pages
    categories.forEach(category => {
      createPage({
        path: `/category/${_.kebabCase(category.fieldValue)}/`,
        component: path.resolve(
          rootDir,
          "gatsby-theme-boilerplate-blog/src/templates/category-list-page.js"
        ),
        context: {
          categories: category.fieldValue,
          siteMetadata: result.data.siteMetadata,
          footerThreeMarkdowRemark: result.data.footerThreeMarkdowRemark,
          postsPerPage: result.data.postsPerPage,
        },
      });
    });

    let allFeed = [];

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let imgsObj = [];

      const slug = node.fields.slug;
      const frontmatter = node.frontmatter;
      const { date, title } = frontmatter;
      const imageSrc =
        businessInfos.siteUrl +
        node.frontmatter.featuredImage.childrenImageSharp[0].gatsbyImageData
          .images.fallback.src;

      node.htmlAst.children.map(child => {
        if (child.children && child.children[0]) {
          if (child.children[0].tagName === "img") {
            imgsObj.push(child.children[0].properties.src);
          }
        }
      });

      allFeed.push({
        slug: slug,
        date: date,
        title: title,
        imageSrc: imageSrc,
        excerpt: node.excerpt,
        insideImgs: imgsObj,
      });
    });
    const theXML = `<?xml version="1.0" encoding="UTF-8"?>
		<?xml-stylesheet type="text/xsl" href="/template.xsl"?>
			<urlset
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
				xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${allFeed.map(item => {
          return `<url>
					<loc>${businessInfos.siteUrl}${item.slug}</loc>
					<lastmod>${item.date}</lastmod>
					<image:image>
						<image:loc>${item.imageSrc}</image:loc>
					</image:image>
						${
              item.insideImgs.length > 0
                ? item.insideImgs.map(img => {
                    return `<image:image>
											<image:loc>${
                        img.substring(0, 4) === "http"
                          ? img
                          : businessInfos.siteUrl + img
                      }</image:loc>
										</image:image>`;
                  })
                : ""
            }
				</url>`;
        })}
		</urlset>
		`;
    fs.writeFileSync(`./public/post-sitemap.xml`, theXML);
  });
};
