import { Link } from "react-router-dom";

export function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        Welcome to our blog! We are passionate about sharing insightful
        articles, tutorials, and resources on web development, technology, and
        programming.
      </p>
      <p>
        Our mission is to empower developers of all levels by providing
        high-quality content, tips, and best practices. Whether you are just
        starting out or are an experienced professional, you'll find something
        valuable here.
      </p>
      <p>
        Our team consists of experienced developers, writers, and tech
        enthusiasts who love to learn and share knowledge. We believe in
        continuous learning and fostering a supportive community. Create blog{" "}
        <Link to="/createBlog">Create Blog</Link>
      </p>
    </div>
  );
}
