import type { IFriends, IWorkDays } from "../../types/friends";

import s from "./FriendsItem.module.css";

const FriendsItem = ({
  title,
  imageUrl,
  address,
  email,
  phone,
  workDays,
  url,
}: IFriends) => {
  const getTodayWorkHours = (workDays: IWorkDays[]) => {
    if (!workDays || !Array.isArray(workDays) || workDays.length === 0) {
      return <p className={s.workDay}>Day and night</p>;
    }
    const todayIndex = (new Date().getDay() + 6) % 7;
    const today = workDays[todayIndex];

    if (!today || !today.isOpen) {
      return <p className={s.workDay}>Close</p>;
    }
    return <p className={s.workDay}>{`${today.from} - ${today.to}`}</p>;
  };

  return (
    <>
      {getTodayWorkHours(workDays)}

      <div className={s.imgWrapper}>
        <img src={imageUrl} alt="Logo" width={80} height={80} />
      </div>
      <div className={s.wrapper}>
        <h3 className={s.title}>{title}</h3>
        <address className={s.addressBox}>
          {email ? (
            <a className={s.link} href={`mailto:${email}`}>
              <span> Email:</span> {email}
            </a>
          ) : (
            <a
              className={s.link}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span> Email:</span> website only
            </a>
          )}
          <a
            className={s.link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Address:</span> {address ?? "website only"}
          </a>
          {phone ? (
            <a className={s.link} href={`tel:${phone}`}>
              <span> Phone:</span> {phone}
            </a>
          ) : (
            <p className={s.link}>
              <span>Phone:</span> email only
            </p>
          )}
        </address>
      </div>
    </>
  );
};

export default FriendsItem;
