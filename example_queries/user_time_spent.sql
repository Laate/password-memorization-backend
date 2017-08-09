select user_id, date_trunc('second', sum(time_spent)) as time_spent
from (
    select user_id, max(guess_time) - min(guess_time) as time_spent
    from guesses
    group by user_id, session_id) as session_times
group by user_id