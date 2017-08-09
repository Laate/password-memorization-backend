select user_id, session_id, date_trunc('second', max(guess_time) - min(guess_time)) as time_spent
from guesses
group by user_id, session_id;