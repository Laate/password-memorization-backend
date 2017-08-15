select date_trunc('minute', sum(time_spent)) as total_time
from (select max(guess_time) - min(guess_time) as time_spent
      from guesses
      group by user_id, session_id) as session_times;