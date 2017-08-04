class ApplicationMailer < ActionMailer::Base
  default from: "notifications@dev.mbell.me"
  layout "mailer"
end
