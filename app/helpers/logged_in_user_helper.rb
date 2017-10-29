module LoggedInUserHelper
  # user logs in
  def self.user_logs_in(user_id)
    $redis.set("user-#{user_id}", true)
  end

  def self.user_logs_out(user_id)
    $redis.del("user-#{user_id}")
  end

  def self.user_logged_in?(user_id)
    !$redis.get("user-#{user_id}").nil?
  end
end
