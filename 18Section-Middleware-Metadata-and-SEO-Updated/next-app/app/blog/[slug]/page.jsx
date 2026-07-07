import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `Blog ${slug}`,
    description: `Profile Page for User ${slug}`,
    openGraph: {
      images: [
        {
          url: "url",
        },
      ],
    },
  };
}

const SlugPage = async ({ params }) => {
  const { slug } = await params;

  return <div>SlugPage</div>;
};

export default SlugPage;
