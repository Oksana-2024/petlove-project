import { useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";
import Title from "../../components/Title/Title";

import { useEffect } from "react";
import { useAppDispatch } from "../../hook/useDispatch";
import {
  selectPage,
  selectQueryParams,
  selectTotalPages,
} from "../../redux/notices/selectors";
import NoticesList from "../../components/NoticesList/NoticesList";
import PaginationButtons from "../../components/Pagination/Pagination";
import { getNoticesThunk } from "../../redux/notices/operations";
import { setNoticePage } from "../../redux/notices/slice";
import s from "./NoticesPage.module.css";

const NoticesPage = () => {
  const currentPage = useSelector(selectPage);
  const totalPage = useSelector(selectTotalPages);
  const dispatch = useAppDispatch();
  const queryParams = useSelector(selectQueryParams);

  useEffect(() => {
    dispatch(getNoticesThunk())
      .unwrap()
      .then(() => scrollTo({ top: 0, behavior: "smooth" }));
  }, [dispatch, queryParams, currentPage]);

  const handlePage = (_: unknown, page: number) => {
    dispatch(setNoticePage(page));
  };

  return (
    <section className={s.noticePage}>
      <Container className={s.noticeContainer}>
        <Title title="Find your favorite pet" />
        <NoticesFilters />
        <NoticesList />
        <PaginationButtons
          onPageChange={handlePage}
          page={currentPage}
          totalPages={totalPage}
        />
      </Container>
    </section>
  );
};

export default NoticesPage;
