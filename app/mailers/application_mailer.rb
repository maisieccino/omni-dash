class ApplicationMailer < ActionMailer::Base
  default from: ENV["RAILS_MAILER_FROM"] || "notifications@dev.mbell.me"
  layout "mailer"
end
