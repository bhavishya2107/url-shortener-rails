class UrlsController < ApplicationController
  before_action :find_url, only: %i[show update]

  def index
    urls = Url.all.order("created_at DESC")
    render status: :ok, json: { urls: urls }
  end

  def create
    url = Url.new(url_params)
    if url.save
    render status: :ok, json: {notice: "Url generated successfully"}
    else
      render status: :unprocessable_entity,
      json: { errors: url.errors.full_messages.to_sentence }
    end
  end

  def show
    update_click_count
    redirect_to @url.original_url
  end

  def update
    toggle_pin
    if @url.update(url_params)
      render status: :ok, json: { notice: "Url was successfully updated" }
    else
      render status: :unprocessable_entity, json: { errors: @url.errors.full_messages }
    end
  end

  private 

  def url_params
    params.require(:url).permit(:original_url)
  end

  def find_url 
    @url = Url.find_by!(slug: params[:slug])
  rescue ActiveRecord::RecordNotFound => errors
    render status: :not_found, json: { errors: errors }
  end

  def update_click_count
    @url.increment!(:clicks)
  end

  def toggle_pin
    @url.toggle!(:pinned)
  end

end
