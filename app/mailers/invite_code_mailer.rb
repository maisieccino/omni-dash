class InviteCodeMailer < ApplicationMailer
  def invite(invite_code)
    @invite_code = invite_code
    @competition = invite_code.competition
    mail(to: @invite_code.email, subject: "Welcome to #{@competition.name}!")
  end
end
