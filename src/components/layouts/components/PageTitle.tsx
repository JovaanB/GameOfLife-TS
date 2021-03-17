interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return <div>{title}</div>;
};

export default PageTitle;
