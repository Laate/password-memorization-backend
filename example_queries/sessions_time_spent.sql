/*
 * Session is defined by ID saved in the users sessionStorage.
 * A page session lasts for as long as the browser is open and survives over page reloads and restores.
 * Opening a page in a new tab or window will cause a new session to be initiated.
 */
select user_id,
       session_id,
       date_trunc('second', max(guess_time) - min(guess_time)) as time_spent,
       date_trunc('minute', min(guess_time)) as start_date
from guesses
group by user_id, session_id
order by min(guess_time);