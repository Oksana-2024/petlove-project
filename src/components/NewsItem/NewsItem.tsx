import { formatDate } from "../../helpers/formatDate.ts";
import type { INewsItem } from "../../types/news";
import s from "./NewsItem.module.css";

const NewsItem = ({ imgUrl, title, text, date, url }: INewsItem) => {
  return (
    <>
      <img
        className={s.img}
        src={imgUrl!}
        alt={title!}
        width={335}
         />
      <h3 className={s.title}>{title}</h3>
   <div className={s.textBlock}>
        <p className={s.text}>{text}</p>
        <div className={s.linkWrapper}>
          <p className={s.date}>{formatDate(date!)}</p>
          <a
            className={s.link}
            href={url!}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
   </div>
    </>
  );
};

export default NewsItem;
