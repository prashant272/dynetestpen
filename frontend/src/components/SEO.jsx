import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'ImageTech Industries | Manufacturer of Dyne Test Pens, Inks & Doctor Blades';
const DEFAULT_DESCRIPTION = 'ImageTech Industries is an ISO 9001:2015 certified manufacturer of MAGNET Dyne Test Pens, Dyne Test Inks, Doctor Blades and surface energy testing solutions in India.';
const SITE_URL = 'https://www.imagetechindustries.com';
const SITE_NAME = 'ImageTech Industries';

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image,
  type = 'website',
  url,
  noindex = false,
  schema = null,
  publishedTime,
  modifiedTime,
  author,
  category,
}) => {
  const fullTitle = title
    ? (title.includes('ImageTech') ? title : `${title} | ${SITE_NAME}`)
    : DEFAULT_TITLE;

  const currentUrl = url
    ? (url.startsWith('http') ? url : `${SITE_URL}${url}`)
    : (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  const fullImage = image
    ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
    : `${SITE_URL}/logo.svg`;

  const defaultKeywords = [
    'ImageTech Industries',
    'Dyne Test Pens',
    'MAGNET Dyne Pen',
    'Dyne Test Inks',
    'Doctor Blades',
    'Surface Tension Testing',
    'Corona Treatment Validation',
    'ASTM D2578',
    'ISO 8296',
    'Flexo Printing Consumables',
    'Film Converting QC',
  ];

  const allKeywords = [...new Set([...keywords, ...defaultKeywords])].join(', ');

  return (
    <Helmet>
      {/* Basic HTML Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && category && (
        <meta property="article:section" content={category} />
      )}

      {/* Structured Data (JSON-LD) */}
      {schema && (
        Array.isArray(schema) ? (
          schema.map((s, idx) => (
            <script key={idx} type="application/ld+json">
              {JSON.stringify(s)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        )
      )}
    </Helmet>
  );
};

export default SEO;
