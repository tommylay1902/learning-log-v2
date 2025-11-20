SELECT cron.schedule(
    'compute-learning-stats',
    '0 * * * *',  -- Runs every hour
    $$
        WITH WeeklyHours AS (
            SELECT
                u.clerk_id as user_id,
                sum(lls.time_spent) as weekly_hours
            FROM learning_logs ll
            INNER JOIN users u ON u.clerk_id = ll.clerk_id
            INNER JOIN learning_sessions ls ON ls.learning_log_id = ll.id
            INNER JOIN learning_session_segments lls on lls.learning_session_id = ls.id
            WHERE ll.created_at > DATE_TRUNC('week', CURRENT_DATE)
            GROUP BY u.clerk_id
        )
        INSERT INTO user_learning_stats(user_id, weekly_hours)
        SELECT * FROM WeeklyHours
        ON CONFLICT (user_id)
        DO UPDATE SET
            weekly_hours = EXCLUDED.weekly_hours
    $$
);
