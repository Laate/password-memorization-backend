/*
 * Doesn't take into account different sessions. For example, if an user inputs first node today, leaves for a week
 * and then completes the rest of the memorisation, time_to_complete will be one week.
 */
select user_id,
       full_text,
       mem_count,
       max(guess_row) as guess_count,
       date_trunc('second', max(guess_time) - min(guess_time)) as time_to_complete,
       date_trunc('minute', max(guess_time)) as completed_date
from (select user_id,
             user_input,
             full_text,
             mem_count,
             guess_time,
             row_number() over (partition by user_id, full_text, mem_count order by guess_id) as guess_row
      from guesses) as windowed_guesses
where guess_row=1 or user_input=full_text
group by user_id, full_text, mem_count
having max(guess_time) != min(guess_time)
order by user_id, max(guess_time);