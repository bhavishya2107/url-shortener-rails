class UrlsController < ApplicationController
  def index
    urls = Url.all
    render status: :ok, json: { urls: urls }
  end

  def create
    url = Url.new(url_params)
    # url.slug = generate_slug
    if url.save
    render status: :ok, json: {notice: "Url generated successfully"}
    else
      render status: :unprocessable_entity,
      json: { errors: url.errors.full_messages.to_sentence }
  end

  private 

  def url_params
    params.require(:url).permit(:original_url, :pinned)
  end

  def update_click_count
    @url.increment!(:clicks)
  end

  # def generate_slug
  #   param.require(:url).permit(:slug)
  # end
end
