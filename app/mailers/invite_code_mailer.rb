class InviteCodeMailer < ApplicationMailer
  def invite(invite_code)
    @invite_code = invite_code
    @competition = invite_code.competition
    @competition_name = "the hackathon"
    @competition_name = @competition.name unless @competition.nil?
    mail(to: @invite_code.email, subject: "Welcome to #{@competition_name}!")
  end
end
