using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace PhuongXa.API.Controllers;

[ApiController]
public abstract class BaseApiController : ControllerBase
{
    protected Guid IdNguoiDungHienTai
    {
        get
        {
            var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Guid.TryParse(claim, out var id)
                ? id
                : throw new UnauthorizedAccessException("Không xác định được người dùng hiện tại");
        }
    }

    protected string? IdNguoiDungHoacNull =>
        User.FindFirstValue(ClaimTypes.NameIdentifier);

    protected static (int page, int pageSize) ChuanHoaPhanTrang(
        int page, int pageSize, int maxPageSize = 100)
    {
        return (Math.Max(page, 1), Math.Clamp(pageSize, 1, maxPageSize));
    }
}
