select date_trunc('second', avg(time_to_complete)) as avg_time_to_complete
from (select max(guess_time) - min(guess_time) as time_to_complete
      from (select user_id,
                   user_input,
                   full_text,
                   mem_count,
                   guess_time,
                   row_number() over (partition by user_id, full_text, mem_count order by guess_id) as guess_row
            from guesses) as windowed_guesses
      where guess_row=1 or user_input=full_text
      group by user_id, full_text, mem_count
      having max(guess_time) != min(guess_time)) as completed_times;