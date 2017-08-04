class InviteCodeMailer < ApplicationMailer
  def invite(invite_code)
    @invite_code = invite_code
    mail(to: @invite_code.email, subject: "Welcome to Hatch!")
  end
end
