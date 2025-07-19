import type { INewsItem } from "../../types/news";
import NewsItem from "../NewsItem/NewsItem";
import s from "./NewsList.module.css"

const NewsList = ({ news }: { news: INewsItem[] }) => {
  return (
    <ul className={s.list}>
      {news?.map((item) => (
        <li key={item._id}>
          <NewsItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
