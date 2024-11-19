const Page = ({ children, classList = "page" }) => {
  return <div className={classList}>{children}</div>;
};

export default Page;
