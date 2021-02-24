class Url < ApplicationRecord
  before_validation :generate_slug, :set_defaults

  validates :original_url, presence: true, format: URI::regexp(%w[http https])
  validates :slug, presence: true, uniqueness: true

  def generate_slug
    loop do
      self.slug = [*("a".."z"), *("0".."9")].shuffle[0, 6].join
      break slug unless Url.where(slug: self.slug).exists?
    end
  end

  def set_defaults
    self.pinned = false if self.new_record?
    self.clicks = 0 if self.new_record?
  end
end
