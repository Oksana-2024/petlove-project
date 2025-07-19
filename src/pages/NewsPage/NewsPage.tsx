import { useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import NewsList from "../../components/NewsList/NewsList";
import SearchField from "../../components/SearchField/SearchField";
import Title from "../../components/Title/Title";
import {
  selectIsLoading,
  selectNews,
  selectPage,
  selectQuery,
  selectTotalPage,
} from "../../redux/news/selectors";
import { useEffect } from "react";
import { useAppDispatch } from "../../hook/useDispatch";
import s from "./NewsPage.module.css";
import { getNewsThunk } from "../../redux/news/operations";
import Pagination from "../../components/Pagination/Pagination";
import { setPage, setSearch } from "../../redux/news/slice";
import ProgressLoader from "../../components/Loader/Loader";
import { useForm } from "react-hook-form";

const NewsPage = () => {
  const news = useSelector(selectNews);
  const query = useSelector(selectQuery);
  const totalPages = useSelector(selectTotalPage);
  const currentPage = useSelector(selectPage);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewsThunk())
      .unwrap()
      .then(() => scrollTo({ top: 0, behavior: "smooth" }));
  }, [dispatch, query, currentPage]);

  const handlePage = (_: unknown, page: number) => {
    dispatch(setPage(page));
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { dirtyFields, touchedFields },
  } = useForm({
    defaultValues: {
      query: "",
    },
  });

  const handleClear = () => {
    resetField("query");
    dispatch(setSearch(""));
    dispatch(setPage(1));
  };

  const onSubmit = ({ query }: { query: string }) => {
    dispatch(setSearch(query));
    dispatch(setPage(1));
  };

  return (
    <section className={s.newsPage}>
      <Container className={s.newsContainer}>
        {isLoading ? (
          <ProgressLoader />
        ) : (
          <>
            <Title title="News" className={s.title} />
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <SearchField
                placeholder="Search"
                inputProps={register("query")}
                showClearIcon={
                  (dirtyFields.query as boolean) ||
                  (touchedFields.query as boolean)
                }
                onClear={handleClear}
              />
            </form>
            <NewsList news={news} />
            <Pagination
              onPageChange={handlePage}
              page={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </Container>
    </section>
  );
};

export default NewsPage;
