<?php

declare(strict_types=1);

namespace App\OAuth\Model;

use App\Model\Scope;
use League\OAuth2\Server\Entities\ScopeEntityInterface;
use League\OAuth2\Server\Entities\Traits\EntityTrait;

class ScopeEntity implements ScopeEntityInterface
{
    use EntityTrait;

    private string $name;
    private string $description;

    public function __construct(Scope $scope)
    {
        $this->setIdentifier($scope->id);
        $this->name = $scope->name;
    }

    public function jsonSerialize()
    {
        return $this->name;
    }
}
