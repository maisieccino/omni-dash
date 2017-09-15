class AddCompetitionRefToInviteCodes < ActiveRecord::Migration[5.1]
  def change
    add_reference :invite_codes, :competition, foreign_key: true
  end
end
